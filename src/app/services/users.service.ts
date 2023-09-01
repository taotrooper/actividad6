import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient);
  router = inject(Router);
  private baseUrl: string = "https://peticiones.online/api/users/";
  private baseUrlForPag: string = "https://peticiones.online/api/users?page=";

  constructor() { }

  getAll(page: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrlForPag}${page}`));
  }

  getById(id: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${id}`));
  }

  update(formValue: User): Promise<any> {
    return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}${formValue._id}`, formValue))
  }

  delete(id: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${id}`));
  }

  swalDeleteUser(miUser: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas borrar al usuario ${miUser.first_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(String(miUser._id))
          .then((response) => {
            if(!response.error) {
              Swal.fire(
                'Borrado',
                `El usuario ${miUser.first_name} ${miUser.last_name} ha sido eliminado`,
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

  insert(formValue: User): Promise<any> {
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, formValue));
  }

}
