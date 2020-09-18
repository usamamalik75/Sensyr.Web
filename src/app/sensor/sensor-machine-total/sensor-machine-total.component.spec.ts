import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorMachineTotalComponent } from './sensor-machine-total.component';

describe('SensorMachineTotalComponent', () => {
  let component: SensorMachineTotalComponent;
  let fixture: ComponentFixture<SensorMachineTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorMachineTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorMachineTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
