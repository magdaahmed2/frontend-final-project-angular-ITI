import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusersComponent } from './tusers.component';

describe('TusersComponent', () => {
  let component: TusersComponent;
  let fixture: ComponentFixture<TusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TusersComponent]
    });
    fixture = TestBed.createComponent(TusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
