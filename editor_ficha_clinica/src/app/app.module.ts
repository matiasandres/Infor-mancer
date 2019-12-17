import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/comnponents/navbar/navbar.component';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { appRoutingModule } from './app.routes';
import { InicioComponent } from './inicio/inicio.component';
import { EditorFichaModule } from './modulos/editor-ficha/editor-ficha.module';
import { ArquetipoModule } from './modulos/arquetipo/arquetipo.module';
import {MatTabsModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { SidevarComponent } from './shared/comnponents/sidevar/sidevar.component';
import { OnlineOfflineService } from './services/online-offline.service';
import { LocalDBService } from './services/local-db.service';
import { AboutComponent } from './modulos/about/about.component';


import { NoticiasModule } from './modulos/noticias/noticias.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidevarComponent,
    InicioComponent,
    AboutComponent,



  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    UsuarioModule,
    EditorFichaModule,
    ArquetipoModule,
    MatTabsModule,
    NoticiasModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [OnlineOfflineService, LocalDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
