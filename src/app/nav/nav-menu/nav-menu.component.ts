import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  dateTime: string;
  welcomeStatus: string;

  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.dateTime = this.sharedService.getDateTime();
    this.welcomeStatus = this.sharedService.welcomeStatus();
  }

  save(){
    console.log();
  }
}
