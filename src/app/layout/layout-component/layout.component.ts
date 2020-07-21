import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../core';

@Component({
  selector: 'sr-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public global: GlobalService) { }

  ngOnInit() {
  }

}
