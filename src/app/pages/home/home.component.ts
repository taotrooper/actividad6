import { Component, inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  arrUsers: User[] = [];
  totalPages: number = 1;
  page: number = 1;
  usersService = inject(UsersService);

   async ngOnInit() {
    try {
      let response = await this.usersService.getAll();
      this.arrUsers = response.results;
      this.totalPages = response.total_pages;
    } catch(error) {
      console.log(error);
    }
  }

  async loadPage(page: number): Promise<void> {
    try {
      let response = await this.usersService.getAll(page);
      this.arrUsers = response.results;
      this.page = page;
    } catch(error) {
      console.log(error);
    }
  }

}
