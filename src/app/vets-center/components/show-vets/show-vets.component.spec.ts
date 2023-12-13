import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVetsComponent } from './show-vets.component';

describe('ShowVetsComponent', () => {
  let component: ShowVetsComponent;
  let fixture: ComponentFixture<ShowVetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowVetsComponent]
    });
    fixture = TestBed.createComponent(ShowVetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
