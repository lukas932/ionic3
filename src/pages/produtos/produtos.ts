import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

import { ProductHttp } from './../../providers/product-http';
import { InfiniteScroll } from 'ionic-angular/components/infinite-scroll/infinite-scroll';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  products = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productHttp: ProductHttp,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create();
    loading.present();

    this.productHttp
      .getProducts()
      .subscribe(data => {
        setTimeout(() => {
          loading.dismiss();
          this.products = data
        }, 2000);
      });
  }

  doInfinite(infiniteScroll: InfiniteScroll) {

    this.productHttp
      .getProducts()
      .subscribe(newData => {
        for (var i = 0; i < newData.length; i++) {
          this.products.push(newData[i]);
        }
        infiniteScroll.complete();
        if (this.products.length > 30) {
          infiniteScroll.enable(false);
        }
      });
  }

}
