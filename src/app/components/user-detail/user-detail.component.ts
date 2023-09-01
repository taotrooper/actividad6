import { Component, Input, inject } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  @Input() user: User | any;
  usersService = inject(UsersService);

  deleteUser() {
    this.usersService.swalDeleteUser(this.user);
  }

}
