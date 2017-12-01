import { ProductHttp } from './../../providers/product-http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public productHttp: ProductHttp
  ) {}

  ionViewDidLoad() {
    this.productHttp
      .getProduct()
      .subscribe(data => this.products = data);
  }

}
