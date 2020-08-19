import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SensorService } from '../shared/sensor.service';

@Component({
  selector: 'app-sensor-table',
  templateUrl: './sensor-table.component.html',
  styleUrls: ['./sensor-table.component.scss']
})
export class SensorTableComponent implements OnInit {
  isSensorGroup: boolean;

  sensorTableForm: FormGroup;
  @Output() searchClick = new EventEmitter<{ searchText: any }>();
  @Output() searchGroupClick = new EventEmitter<{ searchText: any }>();
  isSensorGroupTable: boolean;

  constructor(
    private sensorService: SensorService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.bindForm();
  }

  private bindForm() {
    this.sensorTableForm = this.formBuilder.group({
      searchText: [''],
      searchGroupText: ['']
    });
  }

  SensorGroup() {
    this.isSensorGroup = true;
  }

  search() {
    if (!this.isSensorGroup) {
      const searchText = this.sensorTableForm.value.searchText;
      if (!(searchText === '' && searchText == null)) {
        this.searchClick.emit(searchText);
      }
    } else {
      const searchGroupText = this.sensorTableForm.value.searchGroupText;
      if (!(searchGroupText === '' && searchGroupText == null)) {
        this.searchGroupClick.emit(searchGroupText);
      }
    }
  }

  resetSerch(type) {
    if (type === 'group') {
      this.isSensorGroup = true;
      this.isSensorGroupTable = true;
    } else {
      this.isSensorGroup = false;
    }
    // this.sensorTableForm.controls.searchText.setValue(null);
  }
}
