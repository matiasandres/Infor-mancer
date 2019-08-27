import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-two-factor-config',
  templateUrl: './two-factor-config.component.html',
  styleUrls: ['./two-factor-config.component.css']
})
export class TwoFactorConfigComponent implements OnInit {

  password_confirmada = false;  // si pasa la confimacion de contraseña, true si la ingresada es correcta
  url2FA= '';
  token2FA = '';
  constructor(
    private _usuarioService: UsuarioService
  ) {
   }

  ngOnInit() {
  }

  confirmarPassword(form){
    this._usuarioService.confirmarPassword(form.password).subscribe(res=>{
      if(!res) return swal.fire('Error', 'Contraseña incorrecta!!', 'error');   // Muestra mensaje de error en caso de que devuelva alguno desde el backend
      this.password_confirmada = true;
      this._usuarioService.get2FAToken().subscribe(res=>{
        this.url2FA = res.url;
        this.token2FA = res.token2FA;
      });
    });
  }
  confirmar2FA(form){
    this._usuarioService.verificar2FA({token2FA: this.token2FA, codigo2FA: form.codigo}).subscribe(res=>{
      if(res){
        this._usuarioService.usuario.token2FA = this.token2FA;
        this._usuarioService.usuario.Activo2FA = true;
        this._usuarioService.actualizarUsuario().subscribe(res=>{
          console.log(res);
          this._usuarioService.token = res.token;
          this._usuarioService.usuario = res.usuario;
          this._usuarioService.guardarStorage();
        });
      }
    });
  }

}
