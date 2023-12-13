import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/user-profile/component/my-pets/my-pets.component.spec.ts
import { MyPetsComponent } from './my-pets.component';

describe('MyPetsComponent', () => {
  let component: MyPetsComponent;
  let fixture: ComponentFixture<MyPetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPetsComponent]
    });
    fixture = TestBed.createComponent(MyPetsComponent);
========
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent]
    });
    fixture = TestBed.createComponent(AdminComponent);
>>>>>>>> de84b5559826f246e046b4c9125ec4e492b9c8b5:src/app/admin/admin.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
