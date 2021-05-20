import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EaringListComponent } from './earing-list.component';

describe('JewelleryListComponent', () => {
  let component: EaringListComponent;
  let fixture: ComponentFixture<EaringListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EaringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EaringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
