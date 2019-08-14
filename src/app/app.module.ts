import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductPipeModule } from './pipes/productPipe.module';
import { ProductfilterPipe } from './pipes/productfilter.pipe';

export const firebaseConfig = {
  apikey:"AIzaSyDVF3cXrQr7t7Ab9eTJ0QTtOOUecZVIZvw",
  authDomain: "313104804796-2n9i4k22k3d0voqnrljsurf9paqlgmnc.apps.googleusercontent.com",
  databaseURL: "https://ctlkart.firebaseio.com",
  projectId: "ctlkart",
  storageBucket: "ctlkart.appspot.com",
  messagingSenderId: "313104804796"
  };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     ProductPipeModule.forRoot(),
     IonicModule.forRoot(), 
     AngularFireModule.initializeApp(firebaseConfig),
     AppRoutingModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseAuthentication,AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
