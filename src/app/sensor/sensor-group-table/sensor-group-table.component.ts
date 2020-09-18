import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { SensorService } from '../shared/sensor.service';
import { SensorStatusIdEnum } from '@app/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SensorGroupFormComponent } from '../sensor-group-form/sensor-group-form.component';
import { ModalService } from '@app/shared/_modal/modal.service';

@Component({
  selector: 'app-sensor-group-table',
  templateUrl: './sensor-group-table.component.html',
  styleUrls: ['./sensor-group-table.component.scss']
})
export class SensorGroupTableComponent implements OnInit {

  groupTableModel: any[] = [];

  sensorStatusIdEnum: typeof SensorStatusIdEnum;
  @Input() private searchGroupClick: EventEmitter<any>;
  groupId: any;

  constructor(
    private sensorService: SensorService,
    private ngbModal: NgbModal,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.sensorStatusIdEnum = SensorStatusIdEnum;
    this.getSensorGroups();
    // this.getTestDetail();
    this.searchEvent();
  }

  searchEvent() {
    this.searchGroupClick.subscribe(
      data => {
        this.getSensorGroups(data);
      }
    );
  }


  getSensorGroups(search?) {
    this.sensorService.getSensorGroups(search).subscribe(
      data => {
        this.groupTableModel = data.Data;
        // console.log(JSON.stringify(data));
      },
      error => {
      });
  }


  private getTestDetail() {
    this.sensorService.getTestDetail().subscribe(
      data => {
        this.groupTableModel = data.Data;
      });
  }

  modalData(data) {
    this.groupId = data;
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.groupId = null;
  }

  openSensorGroupForm(data) {
    const modalRef = this.ngbModal.open(SensorGroupFormComponent, {
      size: 'lg',
      windowClass: 'directory-installer',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.data = data;
    modalRef.result.then((result) => {
    }).catch((error) => {
      console.log(error);
    });
  }

}
