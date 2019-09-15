import { Component, OnInit, Input } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';

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
    
  }
  ModificarFicha(){
    this._fichaService.putModificarFicha(this.ficha).subscribe(ficha=>{
      if (ficha) return Swal.fire({
        type:'success',
        title:'Datos modificados',
        text:'Exito al modificar'
      })
      if (!ficha) return Swal.fire({
        type:'error',
        title:'error al modificar los datos',
        text:'no se puede modificar la ficha'
      })
      this.ficha = ficha;
  })}
}
