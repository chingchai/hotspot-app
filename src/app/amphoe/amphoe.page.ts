import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-amphoe',
  templateUrl: './amphoe.page.html',
  styleUrls: ['./amphoe.page.scss'],
})
export class AmphoePage implements OnInit {
  map: Map;
  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.leafletMap();
    this.chart()
  }


  leafletMap() {
    this.map = new Map('map_amphoe', { scrollWheelZoom: false }).setView([16.738560, 100.207789], 6);

    tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);
  }

  chart() {
    var myChart = HighCharts.chart('container', {
      chart: {
        backgroundColor: 'rgba(20, 20, 20, 0.4)',
        style: {
          fontFamily: 'Bai Jamjuree',
          color: '#ffffff'
        }
      },
      title: {
        text: '', style: {
          color: '#ffffff',
        }
      },
      yAxis: {
        title: {
          text: 'Number of Employees', style: {
            color: '#ffffff',
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle', style: {
          color: '#ffffff',
        }
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },

      credits: {
        enabled: false
      },
      series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    });
  }


}
