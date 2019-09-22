import { Component, OnInit } from '@angular/core';
import { ArquetipoService } from '../../services/arquetipo.service';

@Component({
  selector: 'app-lista-arquetipos',
  templateUrl: './lista-arquetipos.component.html',
  styleUrls: ['./lista-arquetipos.component.css']
})
export class ListaArquetiposComponent implements OnInit {

  arquetipos = [];
  constructor(private _arquetipoService: ArquetipoService) { }

  ngOnInit() {
    this._arquetipoService.getArquetipos().subscribe(res=>{
      console.log(res);
    });
  }

}
