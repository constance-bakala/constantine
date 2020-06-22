import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from '@app/auth/signin/signin.component';
import {NgModule} from '@angular/core';
import {MainComponent} from '@app/auth/main/main.component';
import {SignupComponent} from '@app/auth/signup/signup.component';
import {LoginComponent} from '@app/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      }, {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'signin'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule {
}
