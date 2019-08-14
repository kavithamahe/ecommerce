import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcartproductPage } from './viewcartproduct.page';

describe('ViewcartproductPage', () => {
  let component: ViewcartproductPage;
  let fixture: ComponentFixture<ViewcartproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcartproductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcartproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
