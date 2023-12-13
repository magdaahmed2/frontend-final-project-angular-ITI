import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryCardComponent } from './veterinary-card.component';

describe('VeterinaryCardComponent', () => {
  let component: VeterinaryCardComponent;
  let fixture: ComponentFixture<VeterinaryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinaryCardComponent]
    });
    fixture = TestBed.createComponent(VeterinaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
