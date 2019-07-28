import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';



@Component({
  selector: 'app-ampstat',
  templateUrl: './ampstat.page.html',
  styleUrls: ['./ampstat.page.scss'],
})
export class AmpstatPage implements OnInit {
  public passValue: any;
  public map: Map;
  // public map: L.map;

  constructor(
    public navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.passValue = this.navParams.get('data');
    console.log(this.passValue);
    this.loadMap();
  }

  loadMap() {
    this.map = new Map('map-amp', { scrollWheelZoom: true }).setView([16.738560, 100.207789], 6);

    tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);

    const markPoint = marker([16.738560, 100.207789]);
    markPoint.bindPopup('<p>Tashi Delek - Bangalore.</p>');
    this.map.addLayer(markPoint);

  }


  closeModal() {
    this.modalController.dismiss();
  }
}
