import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  constructor(
    private _usuarioService: UsuarioService
  ) {
      this.usuario = _usuarioService.usuario;
   }

  ngOnInit() {
  }

}
