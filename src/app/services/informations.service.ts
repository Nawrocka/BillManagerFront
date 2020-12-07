import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInformation } from '../interfaces/information';
import { IInformations } from '../interfaces/informations';
import { IResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  appUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  addInformation(information: IInformation) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.http.post<IResponse>(this.appUrl + '/api/information/add', information, options).toPromise();
  }

  editInformation(information: IInformation) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.http.put<IResponse>(this.appUrl + '/api/information/edit', information, options).toPromise();
  }

  deleteInformation(email: string) {
    return this.http.delete<IResponse>(this.appUrl + '/api/information/delete/' + email).toPromise();
  }

  getAllByUser(email: string) {
    return this.http.get<IInformations>(this.appUrl + '/api/information/getAll' + email).toPromise();
  }

}
