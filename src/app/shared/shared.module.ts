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
import {PortfolioItemComponent} from './components/portfolio-item/portfolio-item.component';
import {RouterModule} from '@angular/router';
import {GoogleMapsModule} from '@angular/google-maps';
import {MapTemplateComponent} from './components/map-template/map-template.component';
import {AdBannerComponent} from './components/advertisements/ad-banner/ad-banner.component';
import {AdDirective} from './directives/ad.directive';
import {AdItemComponent} from './components/advertisements/ad-item/ad-item.component';
import {HeroJobAdComponent} from './components/advertisements/details/hero-job-add/hero-job-ad.component';
import {HeroProfileComponent} from './components/advertisements/details/hero-profile/hero-profile.component';
import {AdService} from './services/ad.service';
import { AdHeaderComponent } from './components/advertisements/details/ad-header/ad-header.component';

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
    MapTemplateComponent,
    AdBannerComponent,
    AdDirective,
    AdItemComponent,
    HeroJobAdComponent,
    HeroProfileComponent,
    AdHeaderComponent,
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
    FooterComponent,
    NotFoundComponent,
    PortfolioListComponent,
    PortfolioItemComponent,
    MapTemplateComponent,
    AdBannerComponent,
    AdDirective,
    AdItemComponent,
    HeroJobAdComponent,
    HeroProfileComponent,
    AdHeaderComponent,
  ],
  providers: [
    AdService
  ],
  entryComponents: []
})
export class SharedModule {
}
