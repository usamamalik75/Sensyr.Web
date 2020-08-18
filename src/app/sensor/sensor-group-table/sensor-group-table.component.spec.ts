import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorGroupTableComponent } from './sensor-group-table.component';

describe('SensorGroupTableComponent', () => {
  let component: SensorGroupTableComponent;
  let fixture: ComponentFixture<SensorGroupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorGroupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
