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
  name: string;
  ngOnInit() {
    this.online.conexion().subscribe(value => {   // checkea si existe o no conexion a internet
      this.conectado = value;
    })
  }
  logout(){
    this._usuarioService.logout();  // cierra la sesion con el metodo del servicio de Usuario
  }

}
