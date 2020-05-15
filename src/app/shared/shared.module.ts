import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {ContactComponent} from './components/contact/contact.component';
import {AboutComponent} from './components/about/about.component';
import {Portfolio16Component} from './components/modal/portfolio16/portfolio16.component';
import {PortfolioComponent} from './components/modal/portfolio/portfolio.component';
import {Portfolio15Component} from './components/modal/portfolio15/portfolio15.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PortfolioListComponent} from './components/portfolio-list/portfolio-list.component';
import { PortfolioItemComponent } from './components/portfolio-item/portfolio-item.component';
import {RouterModule} from '@angular/router';
import {GoogleMapsModule} from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleMapsModule,
  ],
  declarations: [
    ContactComponent,
    AboutComponent,
    Portfolio16Component,
    PortfolioComponent,
    Portfolio15Component,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    PortfolioListComponent,
    PortfolioItemComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbTooltipModule,
    ContactComponent,
    AboutComponent,
    Portfolio16Component,
    PortfolioComponent,
    Portfolio15Component,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    PortfolioListComponent,
    PortfolioItemComponent,
  ],
  providers: [
  ],
  entryComponents: []
})
export class SharedModule {
}
