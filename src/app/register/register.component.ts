import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public firstName: '';
  public lastName: '';
  public emailId: '';
  public password: '';
  registerForm: FormGroup;
  submitted = false;
  private result: any;
  constructor(private router: Router, private formBuilder: FormBuilder , private authService: AuthenticationService) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const userDetails = {
      'firstName': this.registerForm.value.firstName,
      'lastName': this.registerForm.value.lastName,
      'emailId': this.registerForm.value.email,
      'password': this.registerForm.value.password
    };
    this.authService.addUser(userDetails);
    Swal.fire({
      type: 'success',
      title: 'Registered Successfully',
      timer: 2000
    });
    /*if (window.localStorage) {
      localStorage.setItem(userDetails.emailId, JSON.stringify(userDetails));
      Swal.fire({
        type: 'success',
        title: 'Registered Successfully',
        timer: 2000
      });
    }*/
    this.router.navigate(['/login']);
  }
}
