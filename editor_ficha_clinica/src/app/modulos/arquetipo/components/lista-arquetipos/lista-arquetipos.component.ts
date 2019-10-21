import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArquetipoService } from '../../services/arquetipo.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Arquetipo } from '../../models/arquetipo.model';
import { BehaviorSubject } from 'rxjs';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';
import { LocalDBService } from 'src/app/services/local-db.service';
import { UsuarioService } from 'src/app/modulos/usuario/services/usuario.service';

@Component({
  selector: 'app-lista-arquetipos',
  templateUrl: './lista-arquetipos.component.html',
  styleUrls: ['./lista-arquetipos.component.css']
})
export class ListaArquetiposComponent implements OnInit {

  @Input() agregar_arquetipo = false;
  @Output() enviaArquetipo = new EventEmitter();

  arquetipos:Arquetipo[];
  arquetipos_all: Arquetipo[];
  treeControl: NestedTreeControl<Arquetipo>;
  dataSource = new MatTreeNestedDataSource<Arquetipo>();
  dataChange: BehaviorSubject<Arquetipo[]> = new BehaviorSubject<Arquetipo[]>([]);
  contectado = true;  
  constructor(private _arquetipoService: ArquetipoService,
            private _conectado: OnlineOfflineService,
            private _localDBService: LocalDBService,
            public _usuarioService: UsuarioService
            ){
              this._conectado.conectado.subscribe(res=>{
                if(res != this.contectado){
                  this.contectado = res;
                  this.cargarAquetipos();
                }
              });
              this.treeControl = new NestedTreeControl<Arquetipo>(node => node.campos);
              this.dataChange.subscribe(data=>this.dataSource.data= data);
   }

  
  ngOnInit() {
    this.cargarAquetipos();
  }

  cargarAquetipos(){
    if(this.contectado){
      this._arquetipoService.getArquetipos().subscribe(res=>{
        this.arquetipos = res;
        this.arquetipos_all = res;
        console.log("ARQS_ONLINE", res);
        return this.dataChange.next(this.arquetipos);  // carga la info para la lista de arquetipos
      });
    }
    this._localDBService.getArquetipos().then(res =>{
      console.log("ARQS_LOCAL", res);
      this.arquetipos = res;
      this.arquetipos_all = res;
      this.dataChange.next(this.arquetipos);  // carga la info para la lista de arquetipos
    })
    
  }
  hasChild = (_: number, node: Arquetipo) => !!node.campos && node.campos.length > 0;

  addArquetipo(e){
    this.arquetipos.push(e);    // agrega al array el nuevo arquetipo cargado desde el form
    this.dataChange.next(this.arquetipos);  // actualiza la lista de arquetipos
  }

  filtrar(e){
    
  }
  enviarArquetipo(a){
    this.enviaArquetipo.emit(a);
    console.log(a);
  }
}
