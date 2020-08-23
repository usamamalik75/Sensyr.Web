import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailAnalyticsComponent } from './sensor-detail-analytics.component';

describe('SensorDetailAnalyticsComponent', () => {
  let component: SensorDetailAnalyticsComponent;
  let fixture: ComponentFixture<SensorDetailAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDetailAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDetailAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
