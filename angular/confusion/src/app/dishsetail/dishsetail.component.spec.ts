import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishsetailComponent } from './dishsetail.component';

describe('DishsetailComponent', () => {
  let component: DishsetailComponent;
  let fixture: ComponentFixture<DishsetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishsetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishsetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
