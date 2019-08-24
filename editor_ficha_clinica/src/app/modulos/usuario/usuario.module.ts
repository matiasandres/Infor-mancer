import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RecuperaPassComponent } from './components/recupera-pass/recupera-pass.component';
import { RegistroComponent } from './components/registro/registro.component';
import { USER_ROUTES } from './usuario.routes';



@NgModule({
  declarations: [
    LoginComponent,   
    PerfilComponent,
    RecuperaPassComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    USER_ROUTES,      // rutas del modulo
    
  ]
})
export class UsuarioModule { }
