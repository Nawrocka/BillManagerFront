import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { IInformation } from '../interfaces/information';
import { IInformations } from '../interfaces/informations';
import { IResponse } from '../interfaces/iresponse';
import { InformationsService } from '../services/informations.service';

@Component({
  selector: 'app-info',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  selectedComponent = 'Table';
  elements: IInformations = {informationList: Array<IInformation>()};
  response= {} as IResponse;
  information: IInformation = {Name: '', Content: '', UserId: this.cookieService.get( 'userId')  , Id: 0};
  informationEdit= {} as IInformation;

  constructor(private informationService: InformationsService,
    private toastr: ToastrService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.elements = await this.informationService.getAllByUser(this.cookieService.get('Email'));

  }

  addNew() {
    this.selectedComponent = 'AddNewInfo';
  }

  editInfo(infoToEdit: IInformation) {
    this.selectedComponent = 'Edit';
    this.informationEdit = infoToEdit;
  }

 async addNewInfo() {
  this.response = await this.informationService.addInformation(this.information);

    if (this.response.status === 'Success') {
      this.toastr.success('Dodano informacje');
      this.selectedComponent = 'Table';
      this.elements = await this.informationService.getAllByUser(this.cookieService.get('Email'));
    }
  }

  async editInfoInDB() {
    this.response = await this.informationService.editInformation(this.informationEdit);

    if (this.response.status === 'Success') {
      this.toastr.success('Edytowano informacje');
      this.selectedComponent = 'Table';
      this.elements = await this.informationService.getAllByUser(this.cookieService.get('Email'));
    }
  }
}

