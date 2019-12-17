import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SubirNoticiaComponent } from './components/subir-noticia/subir-noticia.component';
import { NoticiasService } from './services/noticias.service';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NOTICIAS_ROUTES } from './noticias.routes';
import { EditarNoticiaComponent } from './components/editar-noticia/editar-noticia.component';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';



@NgModule({
  declarations: [SubirNoticiaComponent, NoticiasComponent, EditarNoticiaComponent, ImagenPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NOTICIAS_ROUTES

  ], 
  providers: [NoticiasService,
  FormBuilder],
  exports:[
    NoticiasComponent
  ]
})
export class NoticiasModule { }
