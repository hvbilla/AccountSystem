import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {AuthenticationService} from '../authentication.service';
import {LoginComponent} from '../login/login.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public result: any;
  public loggeduser: any;
  constructor(private authService: AuthenticationService ) { }

  Form: FormGroup;
  ngOnInit() {
    this.getUserTransactionDetails();
    this.loggeduser = this.authService.currentUser();
  }
  getUserTransactionDetails() {
    this.authService.getUserTransactionDetails()
      .subscribe(res => {
        if (res != null) {
          debugger;
          this.result = res;
          console.log('abc', this.result);
        }
      }, (err) => {
        Swal.fire({
          type: 'error',
          title: 'Error in login.Please Check your details',
          timer: 2000
        });
        console.log(err);
      });
  }
}
