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
          keyPath: '_id',
        });        
      },
    });
  }
  async addFicha(ficha){
    let trans = this.db.transaction(['ficha'],'readwrite');
    // Crea una almacén de objetos en la transacción
      var objectStore = trans.objectStore("ficha");

      // Agrega nuestro objeto newItem al almacén de objetos
      var objectStoreRequest = objectStore.add(ficha);
      objectStoreRequest.onsuccess = function(event) {
        //Informa sobre el éxito de nuestro nuevo elemento en la base de datos
        console.log("AGREGADOOOOO:::::");
      };
  }
  
 
}
