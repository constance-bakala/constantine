import {inject, TestBed} from '@angular/core/testing';

import {RolesService} from './roles.service';
import {StoreModule} from '@ngrx/store';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {authReducer} from '@app/auth/store';
import {IUser} from '@shared/interfaces';
import {ROLES} from '@shared/services';

xdescribe('RolesService', () => {
  const  user: IUser = {
    nom: 'testN',
    prenom: 'testP',
    codeApporteurPrincipal: 'codeApporteur'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolesService],
      imports: [StoreModule.forRoot({
        'core:auth': authReducer
      }), HttpClientTestingModule],
    });
  });

  it('should be created', inject([RolesService], (service: RolesService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should be return Support Commercial', inject([RolesService], (service: RolesService) => {
    user.indexRole = ROLES.ROLE_SUPPORT_COMMERCIAL.index ;
    expect(service.getRole(user)).toBe(ROLES.ROLE_SUPPORT_COMMERCIAL.value);
    })
  );
  it('should be return Inspecteur', inject([RolesService], (service: RolesService) => {
      user.indexRole = ROLES.ROLE_INSPECTEUR.index ;
      expect(service.getRole(user)).toBe(ROLES.ROLE_INSPECTEUR.value);
    })
  );
  it('should be return Interne', inject([RolesService], (service: RolesService) => {
      user.indexRole = ROLES.ROLE_INTERNE.index ;
      expect(service.getRole(user)).toBe(ROLES.ROLE_INTERNE.value);
    })
  );
  it('should be return Gestion', inject([RolesService], (service: RolesService) => {
      user.indexRole = ROLES.ROLE_GESTION.index ;
      expect(service.getRole(user)).toBe(ROLES.ROLE_GESTION.value);
    })
  );
  it('should be return Administrateur', inject([RolesService], (service: RolesService) => {
      user.indexRole = ROLES.ROLE_ADMINISTRATEUR.index ;
      expect(service.getRole(user)).toBe(ROLES.ROLE_ADMINISTRATEUR.value);
    })
  );
  it('should be return Representant legal', inject([RolesService], (service: RolesService) => {
      user.indexRole = ROLES.ROLE_REPRESENTANT_LEGAL.index ;
      expect(service.getRole(user)).toBe(ROLES.ROLE_REPRESENTANT_LEGAL.value);
    })
  );
  it('should be return Collaborateur A', inject([RolesService], (service: RolesService) => {
      user.indexRole = ROLES.ROLE_COLLABORATEUR_NIVEAU_A.index ;
      expect(service.getRole(user)).toBe(ROLES.ROLE_COLLABORATEUR_NIVEAU_A.value);
    })
  );

  it('should be return Collaborateur B', inject([RolesService], (service: RolesService) => {
      user.indexRole = ROLES.ROLE_COLLABORATEUR_NIVEAU_B.index ;
      expect(service.getRole(user)).toBe(ROLES.ROLE_COLLABORATEUR_NIVEAU_B.value);
    })
  );

});
