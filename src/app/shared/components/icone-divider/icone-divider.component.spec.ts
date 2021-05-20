import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IconeDividerComponent } from './icone-divider.component';

describe('IconeDividerComponent', () => {
  let component: IconeDividerComponent;
  let fixture: ComponentFixture<IconeDividerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IconeDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconeDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
