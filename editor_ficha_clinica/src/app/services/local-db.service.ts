import { Injectable } from '@angular/core';
import {openDB} from 'idb';

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {

  dbName = 'fichas';
  dbTableName = 'ficha';
  dbVersion = 1;

  db;
  constructor() { 
   this.inicia().then(res=>{
     console.log("dsadasd", this.db);
   });
  }
  
  
  async inicia(){
    this.db = await openDB<any>(this.dbName, this.dbVersion, {
      upgrade(db) {
        db.createObjectStore('ficha', {
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
      

     /* objectStoreRequest.onsuccess = function(event) {        
        var myRecord = objectStoreRequest.result;
        console.log("BUSQUEDAAA",myRecord);
      }; */
  }


 
}
