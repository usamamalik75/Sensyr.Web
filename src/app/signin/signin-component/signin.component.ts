import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../core';


@Component({
  selector: 'sensyr-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  loginLoading: boolean = false;
  signIn: FormGroup;
  error: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private zone: NgZone,
    public global: GlobalService,
    private formBuilder: FormBuilder,
  ) {
    this.signIn = this.formBuilder.group({
      'userName': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }


}
