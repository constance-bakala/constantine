import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContactComponent} from './shared/components/contact/contact.component';
import {AboutComponent} from './shared/components/about/about.component';
import {Portfolio16Component} from './shared/components/modal/portfolio16/portfolio16.component';
import {PortfolioComponent} from './shared/components/modal/portfolio/portfolio.component';
import {Portfolio15Component} from './shared/components/modal/portfolio15/portfolio15.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ClothingModule} from './clothing/clothing.module';
import {JewelleryModule} from './jewellery/jewellery.module';
import {MasksModule} from './masks/masks.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutComponent,
    Portfolio16Component,
    PortfolioComponent,
    Portfolio15Component,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClothingModule,
    JewelleryModule,
    MasksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
