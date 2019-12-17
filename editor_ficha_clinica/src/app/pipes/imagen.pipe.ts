import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioService } from '../modulos/usuario/services/usuario.service';
import { URL_UPLOAD } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor(private _usuario: UsuarioService) {}

  transform(nombreArchivo): string {
      if(nombreArchivo == undefined || !nombreArchivo){
          return URL_UPLOAD + 'assets/images/hospital.png'  + this._usuario.getToken();
      }
      return URL_UPLOAD + '/' + nombreArchivo + this._usuario.getToken();
  }

}
