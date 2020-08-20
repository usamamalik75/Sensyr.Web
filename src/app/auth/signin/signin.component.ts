import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.bindForm();
  }

  private bindForm() {
    this.signinForm = this.formBuilder.group({
      email: ['s.arshad623@gmail.com'],
      password: ['Salman@123']
    });
  }


  postLogin(search?) {
    this.authService.postLogin(this.signinForm.value).subscribe(
      data => {
        const token = 'Bearer ' + data.Data.Token;
        this.authenticationService.set('token', token);
        this.router.navigate(['app', 'sensor']);
      },
      error => {
      });
  }



}
