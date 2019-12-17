import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../modulos/usuario/services/usuario.service';
import { URL_UPLOAD } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private _usuarioService: UsuarioService) {  }


  subirArchivo( archivo: File ) {
    const file = new FormData();
    file.append('archivo', archivo);
    return this.http.post(URL_UPLOAD + this._usuarioService.getToken(), file);
}

subirVariosArchivos( archivos: File[] ) {
    const file = new FormData();
    for(let a in archivos){
        file.append('archivo'+a, archivos[a]);
    }
    return this.http.post(URL_UPLOAD + this._usuarioService.getToken(), file);
}
subirVariosArchivosRuta( archivos: File[], item:string, id:string ) {
    const file = new FormData();
    for(let a in archivos){
        file.append('archivo'+a, archivos[a]);
    }
    return this.http.post(URL_UPLOAD+'/'+item+'/'+id + this._usuarioService.getToken(), file);
}

eliminarArchivo( nombreArchivo: string ) {
    return this.http.delete(URL_UPLOAD + '/' + nombreArchivo + this._usuarioService.getToken());
}

obtenerArchivo( nombreArchivo: string ) {
    return this.http.get(URL_UPLOAD + '/' + nombreArchivo + this._usuarioService.getToken());
}
}
