import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasksListComponent } from './masks-list.component';

describe('MasksListComponent', () => {
  let component: MasksListComponent;
  let fixture: ComponentFixture<MasksListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
