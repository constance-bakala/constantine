import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {NotFoundComponent} from './not-found.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

xdescribe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [NotFoundComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterModule.forRoot([], {})],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
