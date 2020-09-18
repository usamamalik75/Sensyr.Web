import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailFormComponent } from './sensor-detail-form.component';

describe('SensorDetailFormComponent', () => {
  let component: SensorDetailFormComponent;
  let fixture: ComponentFixture<SensorDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
