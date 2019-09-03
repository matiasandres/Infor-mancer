import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaComponent } from './components/ficha/ficha.component';
import { FichaService } from './services/ficha.service';
import { EDITOR_FICHA_ROUTES } from './editor-ficha.routes';



@NgModule({
  declarations: [FichaComponent],
  imports: [
    CommonModule,
    EDITOR_FICHA_ROUTES
  ], 
  providers: [FichaService]
})
export class EditorFichaModule { }
