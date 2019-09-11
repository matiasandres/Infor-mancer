import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {

  usuarios = [];
  constructor(
    private _usuarioService: UsuarioService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this._usuarioService.getUsuarios().subscribe(res=>{
      this.usuarios = res.usuarios;
      console.log(this.usuarios);
    });
  }
  activar2fa(user){
    console.log(user);
    user.token2FA = '';
    this._usuarioService.updateUsuario(user).subscribe(res=>{
      Swal.fire('Información', `Usuario <b>${user.email}</b> modificado correctamente`, 'success');
    });
  }
  activarUsuario(user){
    this._usuarioService.updateUsuario(user).subscribe(res=>{
      Swal.fire('Información', `Usuario <b>${user.email}</b> modificado correctamente`, 'success');
    });
  }

  openDialog(content, user){
    this.modalService.open(content, {size:'lg'});
  }
}
