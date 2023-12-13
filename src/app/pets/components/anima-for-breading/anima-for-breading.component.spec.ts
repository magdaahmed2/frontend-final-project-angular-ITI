import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaForBreadingComponent } from './anima-for-breading.component';

describe('AnimaForBreadingComponent', () => {
  let component: AnimaForBreadingComponent;
  let fixture: ComponentFixture<AnimaForBreadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimaForBreadingComponent]
    });
    fixture = TestBed.createComponent(AnimaForBreadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
