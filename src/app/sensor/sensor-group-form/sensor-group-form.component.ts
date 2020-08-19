import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sensor-group-form',
  templateUrl: './sensor-group-form.component.html',
  styleUrls: ['./sensor-group-form.component.scss']
})
export class SensorGroupFormComponent implements OnInit {

  @Input() data;
  constructor(
    public ngbActiveModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}
