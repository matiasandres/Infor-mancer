import { Routes, RouterModule } from "@angular/router";
import { FichaComponent } from './components/ficha/ficha.component';
import { AuthGuardService } from '../usuario/services/auth-guard.service';

const editorFichaRouting: Routes = [
        {
            path: 'ficha',
            component: FichaComponent,
            canActivate: [AuthGuardService],
            data: { title: 'Ficha' }
        }
        
];


export const EDITOR_FICHA_ROUTES = RouterModule.forChild( editorFichaRouting );