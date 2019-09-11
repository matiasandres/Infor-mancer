import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  ficha: any;
  rut = '19.874.598-7';
  constructor(private _fichaService: FichaService) { }

  ngOnInit() {
   
  }

  buscarFicha(){
     this._fichaService.getFichaRut(this.rut).subscribe(f=>{
      this.ficha = f;
    });
  }

}
