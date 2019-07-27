import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamstatPage } from './tamstat.page';

describe('TamstatPage', () => {
  let component: TamstatPage;
  let fixture: ComponentFixture<TamstatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamstatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamstatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
