import { Component, OnInit, Input } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/modulos/usuario/services/usuario.service';
import { LocalDBService } from 'src/app/services/local-db.service';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';

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
  conectado = true;
  constructor(private _fichaService: FichaService
    , private _usuarioService: UsuarioService
    , private _conectadoService: OnlineOfflineService
    , private _localDBService: LocalDBService) {
      this._conectadoService.conectado.subscribe(res=>{this.conectado=res})

      console.log("FICHHASHAS___", this.ficha);
     }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario.email;    
  }
  ModificarFicha(){    
    if(this.conectado){
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
      })
    }    
    else{
      this.ficha.last_update = new Date();
      this._localDBService.updateFicha(this.ficha);   // actualiza Ficha en base de datos local
      Swal.fire('Datos modificados', 'Exito al modificar', 'success');
    }
  }
}
