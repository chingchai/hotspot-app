import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { ServiceService } from '../service.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-tambon',
  templateUrl: './tambon.page.html',
  styleUrls: ['./tambon.page.scss'],
})
export class TambonPage implements OnInit {
  public map: L.Map;
  public tamHP: any;
  public gps: any = [];
  public r: any;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceService,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation
  ) { }

  ngOnInit() {
    const data = this.navParams.get('data');
    this.tamHP = data.data;
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    this.map = new L.Map('map-tam', { scrollWheelZoom: true }).setView([19.234262, 100.191216], 8);

    L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);

    this.r = L.Routing.control({
      // waypoints: [
      //   L.latLng(57.74, 11.94),
      //   L.latLng(57.6792, 11.949)
      // ]
    }).addTo(this.map);

    this.geolocation.watchPosition().subscribe((res: any) => {
      this.gps = [res.coords.latitude, res.coords.longitude];
    });
  }


  routing(a: any) {
    console.log(a);
    this.r.setWaypoints([
      L.latLng(this.gps[0], this.gps[1]),
      L.latLng(Number(a.properties.latitude), Number(a.properties.longitude))
    ]);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
