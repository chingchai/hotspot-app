import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import * as HighCharts from 'highcharts';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { TambonPage } from '../tambon/tambon.page';

@Component({
  selector: 'app-amphoe',
  templateUrl: './amphoe.page.html',
  styleUrls: ['./amphoe.page.scss'],
})
export class AmphoePage implements OnInit {
  public map: Map;
  public hp: any;
  public ampCode: any;
  public rawHP: any;
  public tamHP = [];
  public data = [];
  public categories = [];


  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.ampCode = this.navParams.get('amp_code');
    // this.hp = data.data;
    // console.log(this.hp);
  }
  ionViewDidEnter() {
    this.leafletMap();
    this.loadData();
  }

  leafletMap() {
    this.map = new Map('map-amp', { scrollWheelZoom: true }).setView([19.234262, 100.191216], 8);

    tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'ดาวน์โหลดข้อมูล...'
    });
    await loading.present();

    this.service.getTamHP(this.ampCode).then((res: any) => {
      // console.log(res);
      this.rawHP = res.data.features;
      this.hpCount(this.rawHP);
    });
  }

  hpCount(hp: any) {
    this.service.getTamName(this.ampCode).then(async (res: any) => {
      const tamArr = res.data;
      // console.log(tamArr);
      tamArr.forEach((e: any) => {
        const datArr = [];
        let i = 0;
        hp.forEach((em: any) => {
          if (e.tb_code === em.properties.admin.tb_code) {
            datArr.push(em);
            // console.log(em);
            marker([em.geometry.coordinates[1], em.geometry.coordinates[0]]).bindPopup(
              '<p>hotspot</p>'
            ).addTo(this.map);
            i += 1;
          }
        });
        e.count = i;
        e.data = datArr;
        this.tamHP.push(e);
        this.loadingCtrl.dismiss();
      });
      this.tamHP.forEach((e: any) => {

        this.categories.push(e.tb_tn);
        this.data.push(e.count);
      });
      await this.chart();
    });
  }

  chart() {
    HighCharts.chart('container', {
      chart: {
        backgroundColor: 'rgba(20, 20, 20, 0.6)',
        style: {
          fontFamily: 'Tahoma',
          color: '#ffffff'
        },
        type: 'column'
      },
      title: {
        text: 'hotspot รายตำบล',

        style: {
          fontFamily: 'Tahoma',
          color: '#ffffff'
        },

      },
      xAxis: {
        categories: this.categories,
        labels: {
          style: {
            fontFamily: 'Tahoma',
            color: '#ffffff'
          },
        }
      },
      yAxis: {
        min: 0,
        labels: {
          style: {
            fontFamily: 'Tahoma',
            color: '#ffffff'
          },
        },
        title: {
          text: 'hotspot (จุด)',
          style: {
            fontFamily: 'Tahoma',
            color: '#ffffff'
          },
        }
      },
      series: [{
        name: 'hotspot',
        type: undefined,
        data: this.data
      }]
    });
  }

  async gotoTamHP(a: any) {
    const modalTamHP = await this.modalCtrl.create({
      component: TambonPage,
      componentProps: {
        data: a
      }
    });
    modalTamHP.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
