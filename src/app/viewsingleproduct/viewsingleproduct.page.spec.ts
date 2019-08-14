import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsingleproductPage } from './viewsingleproduct.page';

describe('ViewsingleproductPage', () => {
  let component: ViewsingleproductPage;
  let fixture: ComponentFixture<ViewsingleproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsingleproductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsingleproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
