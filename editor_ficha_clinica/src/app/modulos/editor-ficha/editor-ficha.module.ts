import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaComponent } from './components/ficha/ficha.component';
import { FichaService } from './services/ficha.service';
import { EDITOR_FICHA_ROUTES } from './editor-ficha.routes';
import { FormsModule } from '@angular/forms';
import { EditorArquetiposComponent } from './components/editor-arquetipos/editor-arquetipos.component';
import { DatosPacienteComponent } from './components/datos-paciente/datos-paciente.component';



@NgModule({
  declarations: [FichaComponent, EditorArquetiposComponent, DatosPacienteComponent],
  imports: [
    CommonModule,
    EDITOR_FICHA_ROUTES,
    FormsModule
  ], 
  providers: [FichaService]
})
export class EditorFichaModule { }
