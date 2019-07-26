import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';


@Component({
  selector: 'app-fullmap',
  templateUrl: './fullmap.page.html',
  styleUrls: ['./fullmap.page.scss'],
})
export class FullmapPage implements OnInit {

  map: Map;

  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.leafletMap();
  }


  leafletMap() {
    this.map = new Map('map_full', { scrollWheelZoom: false }).setView([16.738560, 100.207789], 6);

    tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);
  }

}
