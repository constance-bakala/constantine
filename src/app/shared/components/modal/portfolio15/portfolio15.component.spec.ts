import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Portfolio15Component } from './portfolio15.component';

describe('Portfolio15Component', () => {
  let component: Portfolio15Component;
  let fixture: ComponentFixture<Portfolio15Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Portfolio15Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Portfolio15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
