import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfailtsComponent } from './forfailts.component';

describe('ForfailtsComponent', () => {
  let component: ForfailtsComponent;
  let fixture: ComponentFixture<ForfailtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForfailtsComponent]
    });
    fixture = TestBed.createComponent(ForfailtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
