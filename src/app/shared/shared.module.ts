import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {NgbCarouselModule, NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TranslateModule } from '@ngx-translate/core';

import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { Portfolio16Component } from './components/modal/portfolio16/portfolio16.component';
import { PortfolioComponent } from './components/modal/portfolio/portfolio.component';
import { Portfolio15Component } from './components/modal/portfolio15/portfolio15.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';
import { PortfolioItemComponent } from './components/portfolio-item/portfolio-item.component';

import { MapTemplateComponent } from './components/map-template/map-template.component';

import { AdBannerComponent } from './components/advertisements/ad-banner/ad-banner.component';
import { HeroJobAdComponent } from './components/advertisements/details/hero-job-add/hero-job-ad.component';
import { HeroProfileComponent } from './components/advertisements/details/hero-profile/hero-profile.component';
import { AdHeaderComponent } from './components/advertisements/details/ad-header/ad-header.component';
import { AdItemComponent2 } from './components/advertisements/ad-item/ad-item-component2.component';

import { IconeDividerComponent } from './components/icone-divider/icone-divider.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AlertComponent } from './components/alert/alert.component';
import { SnackAlertComponent } from './components/snack-alert/snack-alert.component';
import { CategoryButtonsComponent } from './components/category-buttons/category-buttons.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { FlagsComponent } from './components/flags/flags.component';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';

import { AdDirective } from './directives/ad.directive';
import { NumberOnlyDirective } from '@shared/directives/number-only/number-only.directive';

import { EnumToArrayPipe } from '@shared/pipes/enum-to-array/enum-to-array.pipe';
import { PatternTransformPipe, TextTransformPipe } from '@shared/pipes';
import { TruncatePipe } from '@shared/pipes/truncate-pipe/truncate.pipe';

import { AdService } from './services/ad.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        // UI libs
        NgbModule,
        NgbTooltipModule,
        GoogleMapsModule,
        NgbCarouselModule,

        // Material
        MatCheckboxModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        MatSnackBarModule,

        // i18n
        TranslateModule,
        CommonModule,
    ],
  declarations: [
    // Components
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
    AlertComponent,
    SnackAlertComponent,
    CategoryButtonsComponent,
    ItemDetailsComponent,
    FlagsComponent,
    CurrencySelectorComponent,
    ChatWidgetComponent,

    // Pipes & directives
    EnumToArrayPipe,
    PatternTransformPipe,
    TextTransformPipe,
    TruncatePipe,
    NumberOnlyDirective,
  ],
  exports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // UI libs
    NgbModule,
    NgbTooltipModule,
    GoogleMapsModule,

    // Material (export seulement si utilisé ailleurs)
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,

    // i18n
    TranslateModule,

    // Components to reuse
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
    AlertComponent,
    SnackAlertComponent,
    CategoryButtonsComponent,
    ItemDetailsComponent,
    FlagsComponent,
    CurrencySelectorComponent,
    ChatWidgetComponent,

    // Pipes & directives to reuse
    EnumToArrayPipe,
    PatternTransformPipe,
    TextTransformPipe,
    TruncatePipe,
    NumberOnlyDirective,
  ],
  providers: [AdService],
})
export class SharedModule {}
