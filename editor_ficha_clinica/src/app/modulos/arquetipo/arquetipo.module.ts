import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaArquetiposComponent } from './components/lista-arquetipos/lista-arquetipos.component';
import { ImportaArquetipoComponent } from './components/importa-arquetipo/importa-arquetipo.component';
import { ARQUETIPO_ROUTES } from './arquetipo.routes';
import { ArquetipoService } from './services/arquetipo.service';
import { FormsModule } from '@angular/forms';

import {MatTreeModule} from '@angular/material/tree';

@NgModule({
  declarations: [ListaArquetiposComponent
    , ImportaArquetipoComponent],
  imports: [
    CommonModule, 
    ARQUETIPO_ROUTES,
    FormsModule,
    MatTreeModule
  ],
  providers:[ArquetipoService]
})
export class ArquetipoModule { }
