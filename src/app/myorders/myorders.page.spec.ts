import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyordersPage } from './myorders.page';

describe('MyordersPage', () => {
  let component: MyordersPage;
  let fixture: ComponentFixture<MyordersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyordersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyordersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
