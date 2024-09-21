import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablettesComponent } from './tablettes.component';

describe('TablettesComponent', () => {
  let component: TablettesComponent;
  let fixture: ComponentFixture<TablettesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablettesComponent]
    });
    fixture = TestBed.createComponent(TablettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
