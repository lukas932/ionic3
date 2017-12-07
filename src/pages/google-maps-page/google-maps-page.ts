import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

declare var google;

@Component({
  selector: 'google-maps-page',
  templateUrl: 'google-maps-page.html'
})
export class GoogleMapsPage {

  options: GeolocationOptions;
  currentPos: Geoposition;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private alertCtrl: AlertController,
    private push: Push
  ) {
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('Tem permissão');

          const options: PushOptions = {
            android: {},
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
         };

         const pushObject: PushObject = this.push.init(options);

         pushObject.on('notification').subscribe((notification: any) => {
          alert(notification.message);
         });

         pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
         pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

        } else {
          console.log('Não tem permissão');
        }
      });
  }

  ionViewDidEnter(){
    this.getUserPosition();
  }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: 'Seu ponto foi registrado com sucesso :)',
      buttons: ['Ok']
    });
    alert.present();
  }

  getUserPosition() {
    this.options = {
      enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.currentPos = pos;
      this.addMap(pos.coords.latitude, pos.coords.longitude);
    },(err : PositionError) => {
      console.log("error : " + err.message);
    })
  }

  addMap(lat, long) {
    let latLng = new google.maps.LatLng(lat, long);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
