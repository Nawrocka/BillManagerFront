import { Injectable } from '@angular/core';
import { IUsers } from '../interfaces/iusers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from '../interfaces/iresponse';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  appUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<IUsers>(this.appUrl + '/api/users/getAll').toPromise();
  }

  editUser(user: IUser) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.http.put<IResponse>(this.appUrl + '/api/users/edit', user, options).toPromise();
  }
}
