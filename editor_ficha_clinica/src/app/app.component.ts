import { Component, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { UsuarioService } from './modulos/usuario/services/usuario.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ficha-clinica';

  constructor(public _usuarioService: UsuarioService){
  
  }

}
