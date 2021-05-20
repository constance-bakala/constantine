import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapTemplateComponent } from './map-template.component';

describe('MapTemplateComponent', () => {
  let component: MapTemplateComponent;
  let fixture: ComponentFixture<MapTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
