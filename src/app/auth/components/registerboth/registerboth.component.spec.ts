import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterbothComponent } from './registerboth.component';

describe('RegisterbothComponent', () => {
  let component: RegisterbothComponent;
  let fixture: ComponentFixture<RegisterbothComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterbothComponent]
    });
    fixture = TestBed.createComponent(RegisterbothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
