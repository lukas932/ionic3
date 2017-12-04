import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './../../models/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user: User) {

    let toast = this.toastCtrl.create({
      duration: 3000
    });

    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      this.navCtrl.setRoot('GoogleMapsPage');
      toast.setMessage('Login efetuado com sucesso!');
      toast.present();
    })
    .catch(error => {
      toast.setMessage('Login ou senha inválidos!');
      toast.present();
    });
  }

}
