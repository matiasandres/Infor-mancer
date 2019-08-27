import { Routes, RouterModule } from "@angular/router";
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RecuperaPassComponent } from './components/recupera-pass/recupera-pass.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TwoFactorConfigComponent } from './components/two-factor-config/two-factor-config.component';

const usuarioRouting: Routes = [
        {
            path: 'perfil',
            component: PerfilComponent,
            canActivate: [AuthGuardService],
            data: { title: 'Perfil' }
        },
        {
            path: 'login',
            component: LoginComponent,
            data: { title: 'Login' }
        },
        {
            path: 'registrar',
            component: RegistroComponent,
            data: { title: 'Registrar' }
        },
        {
            path: 'recupera',
            component: RecuperaPassComponent,
            data: { title: 'Recuperar Contraseña' }
        },
        {
            path: 'configuracion_dos_factores',
            component: TwoFactorConfigComponent,
            data: { title: 'Autenticacion de 2 Factores'}
        }
        
];


export const USER_ROUTES = RouterModule.forChild( usuarioRouting );