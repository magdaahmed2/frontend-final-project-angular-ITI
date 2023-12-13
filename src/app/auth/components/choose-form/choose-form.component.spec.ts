import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFormComponent } from './choose-form.component';

describe('ChooseFormComponent', () => {
  let component: ChooseFormComponent;
  let fixture: ComponentFixture<ChooseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseFormComponent]
    });
    fixture = TestBed.createComponent(ChooseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
