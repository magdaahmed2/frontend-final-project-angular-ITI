import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesspaymentComponent } from './successpayment.component';

describe('SuccesspaymentComponent', () => {
  let component: SuccesspaymentComponent;
  let fixture: ComponentFixture<SuccesspaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccesspaymentComponent]
    });
    fixture = TestBed.createComponent(SuccesspaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
