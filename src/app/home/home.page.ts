import { Component } from '@angular/core';

import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Router } from '@angular/router';
import { ServiceService } from './../service.service';
import { ModalController } from '@ionic/angular';
import { AmphoePage } from '../amphoe/amphoe.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: Map;
  public rawHP: any;
  public ampHP = [];

  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    public service: ServiceService
  ) { }

  // ngOnInit() {

  // }

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

  gotoFullmap() {
    this.router.navigateByUrl('/fullmap');
  }

  // gotoAmphoe(a: any) {
  //   this.router.navigate(['/amphoe', { data: a }]);
  // }

  async gotoAmphoe(amp: any) {
    const modalAmpstat = await this.modalCtrl.create({
      component: AmphoePage,
      componentProps: {
        data: amp
      }
    });
    modalAmpstat.present();
  }



  gotoReport7day() {
    this.router.navigateByUrl('/report7day');
  }

}
