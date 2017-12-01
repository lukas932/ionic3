import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ProductHttp provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductHttp {

  constructor(public http: Http) {
    console.log('Hello ProductHttp Provider');
  }

  getProduct(): Observable<Array<any>> {
    return this.http.get('http://localhost:3000/products')
      .map(response => response.json());
  }

}
