import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Portfolio16Component } from './portfolio16.component';

describe('Portfolio16Component', () => {
  let component: Portfolio16Component;
  let fixture: ComponentFixture<Portfolio16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Portfolio16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Portfolio16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
