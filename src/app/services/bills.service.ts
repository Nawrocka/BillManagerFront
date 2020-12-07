import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBill } from '../interfaces/ibill';
import { IBills } from '../interfaces/ibills';
import { IResponse } from '../interfaces/iresponse';
import { IResponseAfterLogin } from '../interfaces/iresponse-after-login';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  appUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  getBillsByUser(email: string) {
    return this.http.get<IBills>(this.appUrl + '/api/bill/getAll/' + email).toPromise();
  }

  addBill(bill: IBill){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers};

    return this.http.post<IResponse>(this.appUrl + 'api/bill/add', bill, options).toPromise();
  }

  editBill(bill: IBill) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.http.put<IResponse>(this.appUrl + '/api/bill/edit', bill, options).toPromise();
  }

  deleteBill(email: string) {
    return this.http.delete<IResponse>(this.appUrl + '/api/bill/delete/' + email).toPromise();
  }
}
