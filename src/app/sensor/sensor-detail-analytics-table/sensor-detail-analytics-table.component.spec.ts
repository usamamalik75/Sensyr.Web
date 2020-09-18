import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailAnalyticsTableComponent } from './sensor-detail-analytics-table.component';

describe('SensorDetailAnalyticsTableComponent', () => {
  let component: SensorDetailAnalyticsTableComponent;
  let fixture: ComponentFixture<SensorDetailAnalyticsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDetailAnalyticsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDetailAnalyticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
