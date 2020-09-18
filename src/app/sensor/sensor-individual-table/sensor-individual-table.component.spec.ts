import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorIndividualTableComponent } from './sensor-individual-table.component';

describe('SensorIndividualTableComponent', () => {
  let component: SensorIndividualTableComponent;
  let fixture: ComponentFixture<SensorIndividualTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorIndividualTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorIndividualTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
