import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/modulos/usuario/services/usuario.service';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() drawer
  constructor(
    public _usuarioService: UsuarioService,
    private online: OnlineOfflineService
  ) {
    this.online.conectado.subscribe(res=>{    // checkea la conexion al servidor y a internet
      this.conectado=res});
   }

  conectado=true;
  ngOnInit() {

  }
  logout(){
    this._usuarioService.logout();  // cierra la sesion con el metodo del servicio de Usuario
  }
}
