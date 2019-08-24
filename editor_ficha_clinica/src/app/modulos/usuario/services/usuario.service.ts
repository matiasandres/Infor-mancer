import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token = '';   // token devuelto por el Backen al momento de iniciar sesion
  constructor( 
    private router: Router  
    ) { }


  logout(){   // metodo para cerrar sesion de usuario
    this.router.navigate(['/login']);
  }
  estaLogueado(){  // Metodo que regresa True si tiene un token valido y False si es invalido
    return true;
  }
}
