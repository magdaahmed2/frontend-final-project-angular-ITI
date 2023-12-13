import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfeedbacksComponent } from './tfeedbacks.component';

describe('TfeedbacksComponent', () => {
  let component: TfeedbacksComponent;
  let fixture: ComponentFixture<TfeedbacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TfeedbacksComponent]
    });
    fixture = TestBed.createComponent(TfeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
