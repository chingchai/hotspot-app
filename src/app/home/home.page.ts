import { Component } from '@angular/core';

import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { NavController, ModalController } from '@ionic/angular';
import { AmpstatPage } from '../ampstat/ampstat.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public map: Map;
  public value = 1;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) { }

  ionViewDidEnter() {
    this.leafletMap();
  }


  leafletMap() {
    this.map = new Map('map', { scrollWheelZoom: false }).setView([16.738560, 100.207789], 6);

    tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);

    const markPoint = marker([12.972442, 77.594563]);
    markPoint.bindPopup('<p>Tashi Delek - Bangalore.</p>');
    this.map.addLayer(markPoint);
  }

  async gotoAmpstat() {
    const modalAmpstat = await this.modalCtrl.create({
      component: AmpstatPage,
      componentProps: {
        id: this.value
      }
    });
    modalAmpstat.present();
  }

}
