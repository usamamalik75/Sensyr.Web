import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sensyr-web';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    const token = this.authenticationService.get('token');
    if (!token) {
      this.router.navigate(['auth', 'login']);
    }
  }
}
