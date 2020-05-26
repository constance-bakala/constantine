import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from '@app/auth/signin/signin.component';
import {NgModule} from '@angular/core';
import {MainComponent} from '@app/auth/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
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
