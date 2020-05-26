import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {WelcomeComponent} from '@app/features/welcome/welcome.component';


@NgModule({
  declarations: [WelcomeComponent,],
  imports: [
    SharedModule
  ]
})
export class WelcomeModule { }
