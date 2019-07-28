import { Component } from '@angular/core';

import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: Map;


  constructor(
    private router: Router
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
  }

  gotoFullmap() {
    this.router.navigateByUrl('/fullmap')
  }

  gotoAmphoe() {
    this.router.navigateByUrl('/amphoe')
  }
  gotoReport7day() {
    this.router.navigateByUrl('/report7day')
  }

}
