import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvetsComponent } from './myvets.component';

describe('MyvetsComponent', () => {
  let component: MyvetsComponent;
  let fixture: ComponentFixture<MyvetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyvetsComponent]
    });
    fixture = TestBed.createComponent(MyvetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
