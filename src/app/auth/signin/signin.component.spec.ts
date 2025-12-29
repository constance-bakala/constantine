import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SigninComponent} from './signin.component';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

xdescribe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SigninComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([], {})],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
