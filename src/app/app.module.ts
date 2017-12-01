
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { GoogleMapsPage } from '../pages/google-maps-page/google-maps-page';
import { ProdutosPage } from './../pages/produtos/produtos';
import { ProdutoDetalhesPage } from './../pages/produto-detalhes/produto-detalhes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductHttp } from '../providers/product-http';

@NgModule({
  declarations: [
    MyApp,
    GoogleMapsPage,
    ProdutosPage,
    ProdutoDetalhesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        {component: GoogleMapsPage, segment: 'google-map', name: 'google-map'},
        {component: ProdutosPage, segment: 'produtos', name: 'Produtos'},
        {component: ProdutoDetalhesPage, segment: 'produtos/:produto/detalhes', name: 'ProdutoDetalhes'}
      ]
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GoogleMapsPage,
    ProdutosPage,
    ProdutoDetalhesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductHttp
  ]
})
export class AppModule {}
