import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { URL_NOTICIAS } from 'src/app/config/config';
import { UploadService } from 'src/app/services/upload.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(public http: HttpClient,
      private _usuarioService: UsuarioService
      , private _uploadService: UploadService) { }

  getNoticias(){
    return this.http.get<any>(URL_NOTICIAS+`/${this._usuarioService.getToken()}`);
  }

  agregarNoticia(noticia){
    
    return this.http.post<any>(URL_NOTICIAS+`/${this._usuarioService.getToken()}`,noticia);
  }

  putModificarNoticia(noticia, fotos?: File[]){
    if(fotos){
      var id = noticia._id;
      this._uploadService.subirVariosArchivosRuta(fotos, 'noticias', id).subscribe(res => {
          let respuesta = <any>{};
          respuesta = res;
          for(let f of respuesta.archivos){
            noticia.imagen = 'noticias/'+id+'/' + f; // ruta de la imagen
          }
          this.putModificarNoticia(noticia).subscribe();
      });
  }
    return this.http.put<any>(URL_NOTICIAS+`/${noticia._id}/${this._usuarioService.getToken()}`,noticia);
  }
}

