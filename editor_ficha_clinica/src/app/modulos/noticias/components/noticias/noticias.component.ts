import { Component, OnInit } from '@angular/core';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Noticia } from '../../models/noticia.model';
import { BehaviorSubject } from 'rxjs';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';
import { LocalDBService } from 'src/app/services/local-db.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias: any;     // lista de arquetipos a mostrar
  noticias_all: Noticia[];  // lista de arquetipos para filtrar
  treeControl: NestedTreeControl<Noticia>;    // Objeto para mostrar la lista
  dataSource = new MatTreeNestedDataSource<Noticia>();    // 
  dataChange: BehaviorSubject<Noticia[]> = new BehaviorSubject<Noticia[]>([]);
  contectado = true;

  _noticiasService: any;
  constructor(
    _noticiasService: NoticiasService,
    private _localDBService: LocalDBService,
) { }

  ngOnInit() {
    
    this.cargarNoticias();
    
  }
  cargarNoticias(){
    this._noticiasService.getNoticias().subscribe(res => {
      this.noticias = res;
      console.log(res);
    });

    
  }
  
 
}
