import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../interfaces/iresponse';
import { IUser } from '../interfaces/iuser';
import { IUsers } from '../interfaces/iusers';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectComponent = 'Table';
  headElements = ['Nazwa', 'Mail', 'Num. Telefonu', 'Zaplacil', 'Edytuj'];
  response = {} as IResponse;
  user: IUser = { Email: '', PasswordHash: '', UserName: '', PhoneNumber: 0, IsPaid: false, Id: '' };
  elements: IUsers = { userList: Array<IUser>() };
  userEdit = {} as IUser;

  constructor(private usersService: UsersService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.elements = await this.usersService.getAllUsers();
    console.log(this.elements);
  }

  editUser(userToEdit: IUser){
    this.selectComponent = 'Edit';
    console.log(userToEdit);
    this.user = userToEdit;
  }

  async editUserInDB(){
    this.response = await this.usersService.editUser(this.user);

    if(this.response.status === 'Success'){
      this.toastr.success('Edytowano użytkownika');
      this.selectComponent = 'Table';
      this.elements = await this.usersService.getAllUsers();
    }
  }

}
