import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from '../usuario/services/auth-guard.service';


import { NoticiasComponent } from './components/noticias/noticias.component';
import { SubirNoticiaComponent } from './components/subir-noticia/subir-noticia.component';
import { AdminGuardService } from '../usuario/services/admin-guard.service';

const noticiasRouting: Routes = [
        {
            path: 'noticias',
            component: NoticiasComponent,
            canActivate: [AuthGuardService],
            data: { title: 'noticias' }
        },
        {
            path: 'subir',
            component: SubirNoticiaComponent,
            canActivate: [AuthGuardService,AdminGuardService],
            data: { title: 'subir-noticia' }
        }
];


export const NOTICIAS_ROUTES = RouterModule.forChild( noticiasRouting );