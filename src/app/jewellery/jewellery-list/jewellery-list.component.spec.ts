import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelleryListComponent } from './jewellery-list.component';

describe('JewelleryListComponent', () => {
  let component: JewelleryListComponent;
  let fixture: ComponentFixture<JewelleryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JewelleryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JewelleryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
