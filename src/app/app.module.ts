import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { LoginPage } from './../pages/login/login';
import { GoogleMapsPage } from '../pages/google-maps-page/google-maps-page';
import { ProdutosPage } from './../pages/produtos/produtos';
import { ProdutoDetalhesPage } from './../pages/produto-detalhes/produto-detalhes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductHttp } from '../providers/product-http';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    MyApp,
    GoogleMapsPage,
    ProdutosPage,
    ProdutoDetalhesPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: GoogleMapsPage, segment: 'google-map', name: 'GoogleMapsPage'},
        {component: ProdutosPage, segment: 'produtos', name: 'Produtos'},
        {component: ProdutoDetalhesPage, segment: 'produtos/:produto/detalhes', name: 'ProdutoDetalhes'}
      ]
    }),
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GoogleMapsPage,
    ProdutosPage,
    ProdutoDetalhesPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductHttp,
    AngularFireAuth
  ]
})
export class AppModule {}
