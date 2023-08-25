import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient);
  private baseUrl: string = "https://peticiones.online/api/users/";
  private baseUrlForPag: string = "https://peticiones.online/api/users?page=";

  constructor() { }

  getAll(page: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrlForPag}${page}`));
  }

  getById(id: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${id}`));
  }

  /*getTotalPages(): number {
    return 1;
  }*/

  update(formValue: User) {

  }

  delete(id: string) {

  }

  insert(formValue: User) {

  }

}
