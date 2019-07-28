import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-report7day',
  templateUrl: './report7day.page.html',
  styleUrls: ['./report7day.page.scss'],
})
export class Report7dayPage {

  constructor() { }

  ionViewDidEnter() {
    this.chart()
  }
  chart() {
    var myChart = HighCharts.chart('container2', {
      chart: {
        backgroundColor: 'rgba(20, 20, 20, 0.6)',
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
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        type: undefined
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
