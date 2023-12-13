import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvetcentersComponent } from './tvetcenters.component';

describe('TvetcentersComponent', () => {
  let component: TvetcentersComponent;
  let fixture: ComponentFixture<TvetcentersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvetcentersComponent]
    });
    fixture = TestBed.createComponent(TvetcentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
