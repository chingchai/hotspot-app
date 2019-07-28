import { Component } from '@angular/core';

import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { NavController, ModalController } from '@ionic/angular';
import { AmpstatPage } from '../ampstat/ampstat.page';
import { ServiceService } from './../service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public map: Map;

  public rawHP: any;
  public ampHP = [];
  public value = 1;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public service: ServiceService
  ) { }

  ionViewDidEnter() {
    this.leafletMap();
    this.loadData();
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

  loadData() {
    this.service.getAmpHP().then((res: any) => {
      // console.log(res);
      this.rawHP = res.data.features;
      this.ampCount(this.rawHP);
    });
  }

  ampCount(hp: any) {
    this.service.ampName().then((res: any) => {
      const ampArr = res.data;
      ampArr.forEach((e: any) => {
        const datArr = [];
        let i = 0;
        hp.forEach((em: any) => {
          if (e.ap_code === em.properties.admin.ap_code) {
            datArr.push(em);
            i += 1;
          }
        });
        e.count = i;
        e.data = datArr;
        this.ampHP.push(e);
      });
    });
  }

  async gotoAmpstat(amp: any) {
    const modalAmpstat = await this.modalCtrl.create({
      component: AmpstatPage,
      componentProps: {
        data: amp
      }
    });
    modalAmpstat.present();
  }

}
