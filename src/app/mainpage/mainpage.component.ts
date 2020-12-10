import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  selectedComponent = 'Home';
  isAdmin='';

  constructor(private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isAdmin = this.cookieService.get('isAdmin');
  }

  componentSelect(choosedComponent: string){
    if(choosedComponent === 'Logout'){
      this.cookieService.set('userEmail', '');
      this.toastr.success('Wylogowałeś się');
      this.router.navigate(['login']);
    }
    this.selectedComponent=choosedComponent;
  }

}
