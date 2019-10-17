import { Component, OnInit } from '@angular/core';
import { FichaService } from '../modulos/editor-ficha/services/ficha.service';
import { LocalDBService } from '../services/local-db.service';
import { ArquetipoService } from '../modulos/arquetipo/services/arquetipo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private _fichaService: FichaService,
        private _arquetiposService: ArquetipoService,
        private _localDBService: LocalDBService) {

    this._fichaService.getFichas().subscribe(fichas=>{    
      this._localDBService.addFichas(fichas);      // carga las fichas a la base de datos local al cargar inicio
    });

    this._arquetiposService.getArquetipos().subscribe(arqs => {
      this._localDBService.addArquetipos(arqs);   // carga los arquetipos a la base de datos local
    })
   }

  ngOnInit() {
  }

}
