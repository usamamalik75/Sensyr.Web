import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorGroupFormComponent } from './sensor-group-form.component';

describe('SensorGroupFormComponent', () => {
  let component: SensorGroupFormComponent;
  let fixture: ComponentFixture<SensorGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
