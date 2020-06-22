import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
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
import {HeroJobAdComponent} from './components/advertisements/details/hero-job-add/hero-job-ad.component';
import {HeroProfileComponent} from './components/advertisements/details/hero-profile/hero-profile.component';
import {AdService} from './services/ad.service';
import {AdHeaderComponent} from './components/advertisements/details/ad-header/ad-header.component';
import {AdItemComponent2} from './components/advertisements/ad-item/ad-item-component2.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {IconeDividerComponent} from './components/icone-divider/icone-divider.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NavigationComponent } from './components/navigation/navigation.component';
import {EnumToArrayPipe} from '@shared/pipes/enum-to-array/enum-to-array.pipe';
import {PatternTransformPipe, TextTransformPipe, TranslatePipe} from '@shared/pipes';
import {NumberOnlyDirective} from '@shared/directives/number-only/number-only.directive';
import {TruncatePipe} from '@shared/pipes/truncate-pipe/truncate.pipe';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleMapsModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
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
    HeroJobAdComponent,
    HeroProfileComponent,
    AdHeaderComponent,
    AdItemComponent2,
    IconeDividerComponent,
    NavigationComponent,
    EnumToArrayPipe,
    PatternTransformPipe,
    TextTransformPipe,
    NumberOnlyDirective,
    TruncatePipe,
    TranslatePipe,
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
    MapTemplateComponent,
    AdBannerComponent,
    AdDirective,
    HeroJobAdComponent,
    HeroProfileComponent,
    AdHeaderComponent,
    IconeDividerComponent,
    NavigationComponent,
    EnumToArrayPipe,
    PatternTransformPipe,
    TextTransformPipe,
    NumberOnlyDirective,
    TruncatePipe,
    TranslatePipe,
  ],
  providers: [
    AdService
  ],
  entryComponents: []
})
export class SharedModule {
}
