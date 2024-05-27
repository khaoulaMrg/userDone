import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSidenavContainer} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

import {MatDivider} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {  HttpClientModule } from '@angular/common/http';
import { MarocComponent } from './auth-components/maroc/maroc.component';
import { RouterModule } from '@angular/router';
import { AfriqueComponent } from './auth-components/afrique/afrique.component';
import { EuropeComponent } from './auth-components/europe/europe.component';
import { AsieComponent } from './auth-components/asie/asie.component';
import { AmeriqueComponent } from './auth-components/amerique/amerique.component';
import { LatestComponent } from './auth-components/latest/latest.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FirstComponent } from './auth-components/first/first.component';
@NgModule({
  declarations: [
    AppComponent,
    MarocComponent,
    AfriqueComponent,
    EuropeComponent,
    AsieComponent,
    AmeriqueComponent,LatestComponent, PostDetailComponent,FirstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     MatToolbarModule,
     MatIconModule,
     MatSidenavContainer,
     MatSidenavModule
     ,MatDivider,CommonModule, RouterModule, BrowserModule,
     HttpClientModule,MatToolbarModule,

    ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
