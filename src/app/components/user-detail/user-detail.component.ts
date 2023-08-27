import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  @Input() user: User | any;
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

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
        this.usersService.delete(this.user._id)
          .then((response) => {
            if(!response.error) {
              Swal.fire(
                'Borrado',
                `El usuario ${this.user.first_name} ${this.user.last_name} ha sido eliminado`,
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
