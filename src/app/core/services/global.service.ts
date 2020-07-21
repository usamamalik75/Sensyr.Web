import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { APP_CONFIG } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  userName: string = '';
  private tokenValue: string = '';

  //clock
  private clock: Observable<Date>;
  constructor() {
    //setting clock observable
    this.clock = interval(1000).pipe(
      map(tick => new Date()),
      share()
    );
    // this.alerts = data.alerts;
  }

  //token getter

  //returning clock
  getClock(): Observable<Date> {
    return this.clock;
  }

  get token() {
    return this.tokenValue;
  }

}