import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TappointmentComponent } from './tappointment.component';

describe('TappointmentComponent', () => {
  let component: TappointmentComponent;
  let fixture: ComponentFixture<TappointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TappointmentComponent]
    });
    fixture = TestBed.createComponent(TappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
