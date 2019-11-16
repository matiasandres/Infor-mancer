import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SubirNoticiaComponent } from './components/subir-noticia/subir-noticia.component';
import { NoticiasService } from './services/noticias.service';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NOTICIAS_ROUTES } from './noticias.routes';



@NgModule({
  declarations: [SubirNoticiaComponent, NoticiasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NOTICIAS_ROUTES

  ], 
  providers: [NoticiasService,
  FormBuilder]
})
export class NoticiasModule { }
