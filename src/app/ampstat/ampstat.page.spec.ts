import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmpstatPage } from './ampstat.page';

describe('AmpstatPage', () => {
  let component: AmpstatPage;
  let fixture: ComponentFixture<AmpstatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmpstatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmpstatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
