import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {AppComponent} from '../app.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emailId: '';
  public password;
  public result: any;
  public loggedUser: string;
  // tslint:disable-next-line:max-line-length
  constructor( private router: Router, private formBuilder: FormBuilder, private authService: AuthenticationService, private appComponent: AppComponent) { }

  loginForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get f() { return this.loginForm.controls; }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const userData = {
      email: this.loginForm.value.email ,
      password: this.loginForm.value.password
    }

    this.authService.getUser(userData)
      .subscribe(res => {
        if (res !=null) {
          this.loggedUser = res.fname;
          this.router.navigate(['/home']);
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
