import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EaringListComponent } from './earing-list.component';

describe('JewelleryListComponent', () => {
  let component: EaringListComponent;
  let fixture: ComponentFixture<EaringListComponent>;

  beforeEach(async(() => {
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
