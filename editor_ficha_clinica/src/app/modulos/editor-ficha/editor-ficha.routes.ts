import { Routes, RouterModule } from "@angular/router";
import { FichaComponent } from './components/ficha/ficha.component';
import { AuthGuardService } from '../usuario/services/auth-guard.service';
import { AgregarPacienteComponent } from './components/agregar-paciente/agregar-paciente.component';
import { ParamedicoGuardService } from '../usuario/services/paramedico-guard.service';

const editorFichaRouting: Routes = [
        {
            path: 'ficha',
            component: FichaComponent,
            canActivate: [AuthGuardService,ParamedicoGuardService],
            data: { title: 'Ficha' }
        },
        {
            path: 'paciente',
            component: AgregarPacienteComponent,
            canActivate: [AuthGuardService],
            data: { title: 'Paciente' }
        },
      
];


export const EDITOR_FICHA_ROUTES = RouterModule.forChild( editorFichaRouting );