import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

import { ProductHttp } from './../../providers/product-http';

/**
 * Generated class for the ProdutoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detalhes',
  templateUrl: 'produto-detalhes.html',
})
export class ProdutoDetalhesPage {

  product: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productHttp: ProductHttp,
    public loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create();

    loading.present();

    const id = this.navParams.get('produto');
    this.productHttp
      .getProductById(id)
      .subscribe(data => {
        setTimeout(() => {
          loading.dismiss();
          this.product = data
        }, 2000);
      });
  }
}
