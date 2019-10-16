import { Injectable } from '@angular/core';
import {  fromEvent, merge, of, Subject, Observable, interval } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { URL_SERVER } from '../config/config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  pingStream: Subject<number> = new Subject<number>();
  ping: number = 0;
  url: string = URL_SERVER;
  constructor(private _http: HttpClient) { 
    interval(3000)
      .subscribe((data) => {
        let timeStart: number = performance.now();
        this._http.get(this.url)
          .subscribe(data => {
            let timeEnd: number = performance.now();
            let ping: number = timeEnd - timeStart;
            this.ping = ping;
            this.pingStream.next(ping);
          }, err=>{
            this.ping=0;
            this.pingStream.next(this.ping);
            console.log("Error en conexion");
            
          });
        });
  }
  conexion(){
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
  }
  checkStatus(){
    
  }
}
