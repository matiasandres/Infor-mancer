import { Injectable } from '@angular/core';
import {openDB} from 'idb';

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {

  dbName = 'fichas';
  dbVersion = 1;
  db;   // base de datos
  constructor() { 
   this.inicia().then(res=>{
     console.log("Inicia DB", this.db);
   });
  }
  
  
  async inicia(){
    this.db = await openDB<any>(this.dbName, this.dbVersion, {
      upgrade(db) {
        db.createObjectStore('ficha', {   // crea tabla ficha
          keyPath: '_id'
        });        
        db.createObjectStore('arquetipos', {  // crea tabla de arquetipos
          keyPath: '_id'
        });        
      },
    });
  }
  async addFichas(fichas){
    let trans = this.db.transaction(['ficha'],'readwrite');
    // Crea una almacén de objetos en la transacción
      var objectStore = trans.objectStore("ficha");
      objectStore.clear();
      for(let f of fichas){
        // Agrega nuestro objeto newItem al almacén de objetos
        var objectStoreRequest = objectStore.add(f);
        objectStoreRequest.onsuccess = function(event) {
        };
      }
  }
  async addArquetipos(arquetipos){
    let trans = this.db.transaction(['arquetipos'],'readwrite');
    // Crea una almacén de objetos en la transacción
      var objectStore = trans.objectStore("arquetipos");
      objectStore.clear();
      for(let a of arquetipos){
        // Agrega nuestro objeto newItem al almacén de objetos
        var objectStoreRequest = objectStore.add(a);
        objectStoreRequest.onsuccess = function(event) {
        };
      }
  }
  async updateFicha(ficha){
    let trans = this.db.transaction(['ficha'],'readwrite');
    // Crea una almacén de objetos en la transacción
      var objectStore = trans.objectStore("ficha");
      var actualiza = objectStore.put(ficha);
      actualiza.onsuccess = function(res){
        console.log("Actualizado", res);
      };
  }
  async getFicha(rut){
    let trans = this.db.transaction(['ficha'],'readwrite');
    // Crea una almacén de objetos en la transacción
      var objectStore = trans.objectStore("ficha");
      let ficha;
      var objectStoreRequest = objectStore.getAll();
      await objectStoreRequest.then(res=>{
        ficha = res.filter(x=>x.paciente.rut==rut)[0];        
      })
      return ficha;
  }
  async getFichas(){
    let trans = this.db.transaction(['ficha'],'readwrite');
    // Crea una almacén de objetos en la transacción
      var objectStore = trans.objectStore("ficha");
      let fichas;
      var objectStoreRequest = objectStore.getAll();
      await objectStoreRequest.then(res=>{
        fichas = res;      
      })
      return fichas;
  }
  async getArquetipos(){
    let trans = this.db.transaction(['arquetipos'],'readwrite');
    // Crea una almacén de objetos en la transacción
      var objectStore = trans.objectStore("arquetipos");
      let arquetipos;
      var objectStoreRequest = objectStore.getAll();
      await objectStoreRequest.then(res=>{
        arquetipos = res;      
      })
      return arquetipos;
  }


 
}
