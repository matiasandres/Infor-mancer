import { Component, OnInit, Input } from '@angular/core';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-editor-arquetipos',
  templateUrl: './editor-arquetipos.component.html',
  styleUrls: ['./editor-arquetipos.component.css']
})
export class EditorArquetiposComponent implements OnInit {

  @Input() ficha:any;
  aRay = [];  
  constructor(private _fichaService: FichaService) { }

  ngOnInit() {
    
    console.log("FICHA:::", this.ficha.arquetipos);
  }
  ModificarFicha(){
    this._fichaService.putModificarFicha(this.ficha).subscribe(ficha=>{
      this.ficha = ficha;
  })}
}
