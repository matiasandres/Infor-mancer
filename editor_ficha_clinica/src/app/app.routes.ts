import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './modulos/usuario/services/auth-guard.service';
import { LoginComponent } from './modulos/usuario/components/login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import {AboutComponent} from './modulos/about/about.component';
import {HeroesComponent} from './modulos/heroes/heroes.component';

const routes: Routes = [
    { path: '', component: InicioComponent , canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    {path: 'about',component:AboutComponent},
    {path: 'heroes',component:HeroesComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

