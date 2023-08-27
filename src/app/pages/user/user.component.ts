import { Component, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  miUser: User | any = {first_name: '', last_name: '', username: '', email: '', image: ''};
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  async ngOnInit(): Promise<void> {
    let id: string = '';
    this.activatedRoute.params.subscribe((params: any) => {
      id = params.idUser;
    })
    try {
      this.miUser = await this.usersService.getById(id);
    } catch(error) {
      console.log(error);
    }
  }

}
