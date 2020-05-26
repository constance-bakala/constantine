import {inject, TestBed} from '@angular/core/testing';

import {IsAuthenticatedGuard} from './core.guard';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {RolesService} from '@shared/services';
import {APP_BASE_HREF} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

xdescribe('IsAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [IsAuthenticatedGuard,
        {provide: RolesService, useValue: {}},
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    });
  });

  it(
    'should ...',
    inject([IsAuthenticatedGuard], (guard: IsAuthenticatedGuard) => {
      expect(guard).toBeTruthy();
    })
  );
});
