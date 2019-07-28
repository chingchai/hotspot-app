import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public pro: any = '56';

  constructor(
    public http: HttpClient
  ) { }

  getAmpHP() {
    return new Promise((res, rej) => {
      const url = `http://localhost:3000/hp/hpamp/${this.pro}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });
  }

  getAmpName() {
    return new Promise((res, rej) => {
      const url = `http://localhost:3000/hp/getamp/${this.pro}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });

  }

  getTamHP(ampcode: any) {
    return new Promise((res, rej) => {
      const url = `http://localhost:3000/hp/hptam/${ampcode}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });
  }

  getTamName(ampcode: any) {
    return new Promise((res, rej) => {
      const url = `http://localhost:3000/hp/gettam/${ampcode}`;
      this.http.get(url).subscribe((data: any) => {
        res(data);
      }, (err: any) => {
        rej(err);
      });
    });

  }


}
