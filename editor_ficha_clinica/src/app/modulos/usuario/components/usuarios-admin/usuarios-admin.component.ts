import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {

  usuarios = [];
  constructor(
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this._usuarioService.getUsuarios().subscribe(res=>{
      this.usuarios = res.usuarios;
      console.log(this.usuarios);
    });
  }
  activar2fa(user){
    console.log(user);
    this._usuarioService.updateUsuario(user).subscribe(res=>{
      console.log(res);
    });


  }
}
