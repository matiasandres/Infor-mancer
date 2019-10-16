import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/modulos/usuario/services/usuario.service';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(
    public _usuarioService: UsuarioService,
    private online: OnlineOfflineService
  ) {
   }

  conectado: boolean;
  ping=0;   // ping al servidor de la api
  ngOnInit() {
    this.online.conexion().subscribe(value => {   // checkea si existe o no conexion a internet
      this.conectado = value;
    });

    this.online.pingStream.subscribe(res=>{ // verifica que el servidor de la api no este caido
      this.ping = res;    
      //console.log("Ping Server:", res);
    });
  }
  logout(){
    this._usuarioService.logout();  // cierra la sesion con el metodo del servicio de Usuario
  }
}
