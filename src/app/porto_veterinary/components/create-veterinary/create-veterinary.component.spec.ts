import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVeterinaryComponent } from './create-veterinary.component';

describe('CreateVeterinaryComponent', () => {
  let component: CreateVeterinaryComponent;
  let fixture: ComponentFixture<CreateVeterinaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVeterinaryComponent]
    });
    fixture = TestBed.createComponent(CreateVeterinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
