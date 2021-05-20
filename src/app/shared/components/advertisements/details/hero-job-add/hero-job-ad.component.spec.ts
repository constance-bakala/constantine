import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeroJobAdComponent } from './hero-job-ad.component';

describe('HeroJobAddComponent', () => {
  let component: HeroJobAdComponent;
  let fixture: ComponentFixture<HeroJobAdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroJobAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroJobAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
