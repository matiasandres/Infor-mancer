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
  conectado: Subject<boolean> = new Subject<boolean>();
  nointernet = false;
  constructor(private _http: HttpClient) { 
    interval(3000)      // checkea la conexion cada 3 segundos
      .subscribe((data) => {
        let timeStart: number = performance.now();
        this._http.get(this.url)        // checkea que exista conexion al servidor de la api rest
          .subscribe(data => {
            let timeEnd: number = performance.now();
            let ping: number = timeEnd - timeStart;
            this.ping = ping;
            this.pingStream.next(ping);
            this.conectado.next((this.nointernet&&ping>0));
          }, err=>{
            this.ping=0;
            this.pingStream.next(this.ping);
            this.conectado.next(false);
            console.log("Error en conexion");            
          });
        });
        this.conexion().subscribe(res=>{    // checkea la conexion a internet
          this.nointernet=res;
        })
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
