import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import { ListComponent } from './list/list.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ListComponent
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
