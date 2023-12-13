import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TordersComponent } from './torders.component';

describe('TordersComponent', () => {
  let component: TordersComponent;
  let fixture: ComponentFixture<TordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TordersComponent]
    });
    fixture = TestBed.createComponent(TordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
