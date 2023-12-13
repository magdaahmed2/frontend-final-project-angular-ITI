import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryDetailsComponent } from './veterinary-details.component';

describe('VeterinaryDetailsComponent', () => {
  let component: VeterinaryDetailsComponent;
  let fixture: ComponentFixture<VeterinaryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinaryDetailsComponent]
    });
    fixture = TestBed.createComponent(VeterinaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
