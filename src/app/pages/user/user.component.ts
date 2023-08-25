import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  activeRoute = inject(ActivatedRoute);
  miUser: User = {first_name: '', last_name: '', username: '', email: '', image: ''};
  usersService = inject(UsersService);

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

}
