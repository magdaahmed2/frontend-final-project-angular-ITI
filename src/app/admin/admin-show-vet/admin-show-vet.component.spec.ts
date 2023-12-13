import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowVetComponent } from './admin-show-vet.component';

describe('AdminShowVetComponent', () => {
  let component: AdminShowVetComponent;
  let fixture: ComponentFixture<AdminShowVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminShowVetComponent]
    });
    fixture = TestBed.createComponent(AdminShowVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
