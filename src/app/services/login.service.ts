import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseAfterLogin } from '../interfaces/iresponse-after-login';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  appUrl = 'https://localhost:5001';

  constructor( private http: HttpClient) { }

  checkIsUser(user: IUser) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const options = {headers: headers}

    return this.http.post<IResponseAfterLogin>(this.appUrl + '/Account/Login', user, options).toPromise();
  }

  register(user: IUser){
    const headers = new HttpHeaders({
      'Contetnt-Type': 'application/json'
    });

    const options = {headers: headers};

    return this.http.post<IResponseAfterLogin>(this.appUrl + 'Account/Register', user, options).toPromise();
  }

}
