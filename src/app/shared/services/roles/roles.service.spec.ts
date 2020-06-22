import {inject, TestBed} from '@angular/core/testing';

import {RolesService} from './roles.service';
import {StoreModule} from '@ngrx/store';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {authReducer} from '@app/auth/store';

xdescribe('RolesService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolesService],
      imports: [StoreModule.forRoot({
        'core:auth:constantine': authReducer
      }), HttpClientTestingModule],
    });
  });
  it('should be created', inject([RolesService], (service: RolesService) => {
      expect(service).toBeTruthy();
    })
  );
});
