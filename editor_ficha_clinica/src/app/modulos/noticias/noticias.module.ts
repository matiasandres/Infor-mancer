import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SubirNoticiaComponent } from './components/subir-noticia/subir-noticia.component';
import { NoticiasService } from './services/noticias.service';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NOTICIAS_ROUTES } from './noticias.routes';
import { EditarNoticiaComponent } from './components/editar-noticia/editar-noticia.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [SubirNoticiaComponent, NoticiasComponent, EditarNoticiaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NOTICIAS_ROUTES,
    PipesModule

  ], 
  providers: [NoticiasService,
  FormBuilder],
  exports:[
    NoticiasComponent
  ]
})
export class NoticiasModule { }
