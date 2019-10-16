import { Component, OnInit, Input } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/modulos/usuario/services/usuario.service';
import { LocalDBService } from 'src/app/services/local-db.service';

@Component({
  selector: 'app-editor-arquetipos',
  templateUrl: './editor-arquetipos.component.html',
  styleUrls: ['./editor-arquetipos.component.css']
})
export class EditorArquetiposComponent implements OnInit {

  @Input() ficha:any;
  @Input() arquetipo:any;
  aRay = [];  
  usuario;
  constructor(private _fichaService: FichaService
    , private _usuarioService: UsuarioService
    , private _localDBService: LocalDBService) { }

  ngOnInit() {
    console.log("ARQUE:::", this.arquetipo);
    this.usuario = this._usuarioService.usuario.email;
    
  }
  ModificarFicha(){
    this._localDBService.updateFicha(this.ficha);   // actualiza Ficha en base de datos local

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
