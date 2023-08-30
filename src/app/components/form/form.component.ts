import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  postForm: FormGroup;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  usersService = inject(UsersService);
  id: string = '';
  miUser: User | any;
  buttonText: string = "Guardar";

  constructor() {
    this.postForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/(https?:\/\/.*)/i),
        Validators.minLength(15)
      ])
    }, []);
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.idUser;
    })
    if (this.id !== undefined) { 
      try {
        this.miUser = await this.usersService.getById(this.id);
        this.buttonText = "Actualizar";
        this.postForm = new FormGroup({
          first_name: new FormControl(this.miUser.first_name, [
            Validators.required,
            Validators.minLength(3)
          ]),
          last_name: new FormControl(this.miUser.last_name, [
            Validators.required,
            Validators.minLength(2)
          ]),
          email: new FormControl(this.miUser.email, [
            Validators.required,
            Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)
          ]),
          image: new FormControl(this.miUser.image, [
            Validators.required,
            Validators.pattern(/(https?:\/\/.*)/i),
            Validators.minLength(15)
          ]),
          _id: new FormControl(this.miUser._id, [])
        }, []);
      } catch(error) {
        console.log(error); 
      }
      if (this.miUser.error) {
        alert("El usuario no existe");
        this.router.navigate(['/home']);
      }
    }
  }

  checkControl(formcontrolName: string, validator: string): boolean | undefined {
    return this.postForm.get(formcontrolName)?.hasError(validator) && this.postForm.get(formcontrolName)?.touched;
  }

  async getDataForm(): Promise<void> {
    if (this.id) {
      //Actualizar
      let response = await this.usersService.update(this.postForm.value);
      if (response._id) {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/home']);
      } else if (response.error) {
        alert(`Error: ${response.error}`);
      } else {
        alert('Error al actualizar, inténtelo de nuevo');
      }
    } else {
      //Insertar
      let response = await this.usersService.insert(this.postForm.value);
      if (response.id) {
        alert(`Usuario ${response.first_name} creado correctamente`);
        this.router.navigate(['/home']);
      } else if (response.error) {
        alert(`Error: ${response.error}`);
      } else {
        alert('Error al insertar usuario nuevo, inténtelo de nuevo');
      }
    }
  }

}
