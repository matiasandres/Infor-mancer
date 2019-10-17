import { Injectable } from '@angular/core';
import { URL_FICHAS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { LocalDBService } from 'src/app/services/local-db.service';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class FichaService {
  
  constructor(public http: HttpClient,
    private _localDBService: LocalDBService,
    private _conectado: OnlineOfflineService,
    private _usuarioService: UsuarioService) {  }
  getFichaRut(rut){
    return this.http.get<any>(URL_FICHAS+`/rut/${rut}/${this._usuarioService.getToken()}`);
  }
  getFichas(){
    return this.http.get<any>(URL_FICHAS+`/${this._usuarioService.getToken()}`);
  }
  putModificarFicha(ficha){
    return this.http.put<any>(URL_FICHAS+`/${ficha._id}/${this._usuarioService.getToken()}`,ficha);
  }
  async syncFichas(){
    let fichas;
    await this._localDBService.getFichas().then(res=>{      
      fichas = {fichas:res};
      this.http.post<any>(URL_FICHAS+`/fichas/${this._usuarioService.getToken()}`,fichas).subscribe(res=>{
        if(res.ok){
          Swal.fire("Sincronizar",'Datos Locales Sincronizados Correctamente', 'success');
        }
      });
    })
  }
  agregarPaciente(paciente){
    return this.http.post<any>(URL_FICHAS+`/paciente/${this._usuarioService.getToken()}`,paciente);
  }
  agregarFicha(ficha){
    return this.http.post<any>(URL_FICHAS+`/${this._usuarioService.getToken()}`,ficha);
  }
}
