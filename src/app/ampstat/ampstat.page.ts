import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ampstat',
  templateUrl: './ampstat.page.html',
  styleUrls: ['./ampstat.page.scss'],
})
export class AmpstatPage implements OnInit {
  public passValue: any;

  constructor(
    public navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.passValue = this.navParams.get('id');
    console.log(this.passValue);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
