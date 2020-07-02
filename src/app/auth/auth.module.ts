import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {APP_PASSWORD_CONFIG} from '@shared/services';

import {SigninComponent} from './signin/signin.component';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthEffects} from './store';
import {authReducer, clearState} from '@app/auth/store';
import {SharedModule} from '@shared/shared.module';
import {MainComponent} from '@app/auth/main/main.component';
import { SignupComponent } from './signup/signup.component';
import {LoginComponent} from '@app/auth/login/login.component';
import {TextTransformPipe} from '@shared/pipes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        NgbModule,
        StoreModule.forFeature(
            'auth',
            {main: authReducer},
            {metaReducers: [clearState]}
        ),
        EffectsModule.forFeature([AuthEffects])
    ],
    declarations: [
        MainComponent,
        SigninComponent,
        SignupComponent,
        LoginComponent,
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        {
            provide: APP_PASSWORD_CONFIG,
            useValue: {
                minLength: 8,
                minConstraints: 3
            }
        }
    ]
})
export class AuthModule {
}
