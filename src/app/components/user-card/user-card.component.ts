import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() miUser: User | any;
  usersService = inject(UsersService);
  router = inject(Router);

  swalDeleteUser() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas borrar al usuario ${this.miUser.first_name}?`,
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
