import { Component, Input, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() miUser: User | any;
  usersService = inject(UsersService);

  deleteUser() {
    this.usersService.swalDeleteUser(this.miUser);
  }

}
