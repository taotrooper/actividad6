import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  activeRoute = inject(ActivatedRoute);
  miUser: User | any = {first_name: '', last_name: '', username: '', email: '', image: ''};
  usersService = inject(UsersService);
  router = inject(Router);

  async ngOnInit(): Promise<void> {
    let id: string = '';
    this.activeRoute.params.subscribe((params: any) => {
      id = params.idUser;
    })
    try {
      this.miUser = await this.usersService.getById(id);
    } catch(error) {
      console.log(error);
    }
  }

  swalDeleteUser() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas borrar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.delete(this.miUser._id)
          .then((response) => {
            if(!response.error) {
              Swal.fire(
                'Borrado',
                `El usuario ${this.miUser.first_name} ${this.miUser.last_name} ha sido eliminado`,
                'success'
              );
              this.router.navigate(["/home"]);
            } else {
              Swal.fire(
                'Error',
                response.error,
                'error'
              )
            }
          }).catch((error) => {
            Swal.fire(
              'Error',
              error,
              'error'
            )
          })
      }
    })
  }

}
