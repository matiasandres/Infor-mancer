import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaComponent } from './components/ficha/ficha.component';
import { FichaService } from './services/ficha.service';



@NgModule({
  declarations: [FichaComponent],
  imports: [
    CommonModule
  ], 
  providers: [FichaService]
})
export class EditorFichaModule { }
