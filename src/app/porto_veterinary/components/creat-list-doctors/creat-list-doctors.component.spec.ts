import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatListDoctorsComponent } from './creat-list-doctors.component';

describe('CreatListDoctorsComponent', () => {
  let component: CreatListDoctorsComponent;
  let fixture: ComponentFixture<CreatListDoctorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatListDoctorsComponent]
    });
    fixture = TestBed.createComponent(CreatListDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
