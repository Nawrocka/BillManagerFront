import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { IBill } from '../interfaces/ibill';
import { IBills } from '../interfaces/ibills';
import { IResponse } from '../interfaces/iresponse';
import { BillsService } from '../services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  selectedComponent = 'Table';
  lastYear = '';
  headElements = ['Rok', 'Nazwa', 'Styczen', 'Luty', 'Marzec', 'Kwiecien', 'Maj',
    'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesien', 'Pazdziernik', 'Listopad',
    'Grudzien', 'Edytuj'];
  response: IResponse;
  bill: IBill = {
    Name: '', Year: '', April: '', August: '', December: '',
    February: '', Id: 0, January: '', July: '',
    June: '', March: '', May: '', November: '', October: '',
    September: '', UserId: this.cookieService.get('userId')
  };
  elements: IBills = { billList: Array<IBill>() };
  billEdit: IBill; //it's not nessesary, but more readable

  constructor(private billsService: BillsService,
    private toastr: ToastrService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.getData();
    this.lastYear = '';
  }

  async getData() {
    this.elements = await this.billsService.getBillsByUser(this.cookieService.get('Email'));
  }

  addNew() {
    this.selectedComponent = 'AddNewBill';
  }

  async addNewBill() {
    this.response = await this.billsService.addBill(this.bill);
    
    if (this.response.status === 'Success') {
      this.toastr.success('Dodano rachunek');
      this.selectedComponent = 'Table';
      this.elements = await this.billsService.getBillsByUser(this.cookieService.get('Email'));
    }
  }

  editBill(billToEdit: IBill) {
    this.selectedComponent = 'Edit';
    console.log(billToEdit);
    this.billEdit = billToEdit;
  }

  async editBillInDB() {
    this.response = await this.billsService.editBill(this.billEdit);

    if (this.response.status === 'Success') {
      this.toastr.success('Edytowano rachunek');
      this.lastYear = '';
      this.selectedComponent = 'Table';
      this.elements = await this.billsService.getBillsByUser(this.cookieService.get('Email'));
    }
  }

  newLastYear(newYear: string) {
    this.lastYear = newYear;
  }
}

