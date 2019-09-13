import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaComponent } from './components/ficha/ficha.component';
import { FichaService } from './services/ficha.service';
import { EDITOR_FICHA_ROUTES } from './editor-ficha.routes';
import { FormsModule } from '@angular/forms';
import { EditorArquetiposComponent } from './components/editor-arquetipos/editor-arquetipos.component';



@NgModule({
  declarations: [FichaComponent, EditorArquetiposComponent],
  imports: [
    CommonModule,
    EDITOR_FICHA_ROUTES,
    FormsModule
  ], 
  providers: [FichaService]
})
export class EditorFichaModule { }
