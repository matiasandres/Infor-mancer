import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { URL_NOTICIAS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(public http: HttpClient,
      private _usuarioService: UsuarioService) { }

  getNoticias(){
    return this.http.get<any>(URL_NOTICIAS+`/${this._usuarioService.getToken()}`);
  }

  agregarNoticia(paciente){
    return this.http.post<any>(URL_NOTICIAS+`/${this._usuarioService.getToken()}`,paciente);
  }

  putModificarNoticia(noticia){
    return this.http.put<any>(URL_NOTICIAS+`/${noticia._id}/${this._usuarioService.getToken()}`,noticia);
  }
}

