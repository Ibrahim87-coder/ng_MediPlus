import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import { ListComponent } from './list/list.component'
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrInfoComponent } from './dr-info/dr-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ListComponent,
    HeaderComponent,
    FooterComponent,
    DrInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
