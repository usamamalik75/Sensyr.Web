import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorAlarmDetailComponent } from './sensor-alarm-detail.component';

describe('SensorAlarmDetailComponent', () => {
  let component: SensorAlarmDetailComponent;
  let fixture: ComponentFixture<SensorAlarmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorAlarmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorAlarmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
