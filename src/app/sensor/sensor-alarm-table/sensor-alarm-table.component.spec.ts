import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorAlarmTableComponent } from './sensor-alarm-table.component';

describe('SensorAlarmTableComponent', () => {
  let component: SensorAlarmTableComponent;
  let fixture: ComponentFixture<SensorAlarmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorAlarmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorAlarmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
