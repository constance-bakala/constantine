import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarringListComponent } from './earring-list.component';

describe('JewelleryListComponent', () => {
  let component: EarringListComponent;
  let fixture: ComponentFixture<EarringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
