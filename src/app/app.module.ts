import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ClothingModule} from './clothing/clothing.module';
import {JewelleryModule} from './jewellery/jewellery.module';
import {MasksModule} from './masks/masks.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        AppRoutingModule,
        ClothingModule,
        JewelleryModule,
        MasksModule
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
