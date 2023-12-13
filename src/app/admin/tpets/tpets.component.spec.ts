import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpetsComponent } from './tpets.component';

describe('TpetsComponent', () => {
  let component: TpetsComponent;
  let fixture: ComponentFixture<TpetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TpetsComponent]
    });
    fixture = TestBed.createComponent(TpetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
