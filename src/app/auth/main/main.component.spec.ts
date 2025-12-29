import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

xdescribe('auth.MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [MainComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('project', {}),
        EffectsModule.forRoot([]),
        RouterTestingModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
