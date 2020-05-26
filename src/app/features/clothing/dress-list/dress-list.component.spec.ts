import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DressListComponent } from './dress-list.component';

describe('ClothingListComponent', () => {
  let component: DressListComponent;
  let fixture: ComponentFixture<DressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
