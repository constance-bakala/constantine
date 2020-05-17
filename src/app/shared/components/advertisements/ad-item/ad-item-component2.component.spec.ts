import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdItemComponent2 } from './ad-item-component2.component';

describe('AdItemComponent', () => {
  let component: AdItemComponent2;
  let fixture: ComponentFixture<AdItemComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdItemComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdItemComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
