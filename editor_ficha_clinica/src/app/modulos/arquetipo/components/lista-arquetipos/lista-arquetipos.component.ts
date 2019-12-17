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

  arquetipos:Arquetipo[];     // lista de arquetipos a mostrar
  arquetipos_all: Arquetipo[];  // lista de arquetipos para filtrar
  treeControl: NestedTreeControl<Arquetipo>;    // Objeto para mostrar la lista
  dataSource = new MatTreeNestedDataSource<Arquetipo>();    // 
  dataChange: BehaviorSubject<Arquetipo[]> = new BehaviorSubject<Arquetipo[]>([]);
  contectado = true;  
  constructor(private _arquetipoService: ArquetipoService,
            private _conectado: OnlineOfflineService,
            private _localDBService: LocalDBService,
            public _usuarioService: UsuarioService
            ){
              this._conectado.conectado.subscribe(res=>{    // chequea q este conectado al servidor e internet con el servicio
                if(res != this.contectado){
                  this.contectado = res;      // asigna la variable de conexion y regstra cambios cuando lo haya 
                  this.cargarAquetipos();     //  vuelve a cargar la lista de arquetipos si hay un cambio en la conexion
                }
              });
              this.treeControl = new NestedTreeControl<Arquetipo>(node => node.campos);  
              this.dataChange.subscribe(data=>this.dataSource.data= data);      // actualiza los datos de la lista si hay algun cambio en los datos
   }

  
  ngOnInit() {
    this.cargarAquetipos();
  }

  cargarAquetipos(){
    if(this.contectado){    
      this._arquetipoService.getArquetipos().subscribe(res=>{     // pide los arquetipos a la API si hay conexion
        this.arquetipos = res;                // arquetipos para mostrar
        this.arquetipos_all = res;            // arquetipos para realizar el filtro
        return this.dataChange.next(this.arquetipos);  // carga la info para la lista de arquetipos
      });
    }
    else{
      this._localDBService.getArquetipos().then(res =>{       // pide los arquetipos desde la base de datos local si no hay conexion con la api
        this.arquetipos = res;          // arquetipos para mostrar
        this.arquetipos_all = res;       // arquetipos para realizar el filtro
        this.dataChange.next(this.arquetipos);  // carga la info para la lista de arquetipos
      })
    }
    
  }
  hasChild = (_: number, node: Arquetipo) => !!node.campos && node.campos.length > 0;

  addArquetipo(e){
    this.arquetipos.push(e);    // agrega al array el nuevo arquetipo cargado desde el form
    this.dataChange.next(this.arquetipos);  // actualiza la lista de arquetipos
  }
  buscar = "";    // input de busqueda de arquetipos
  filtrar(e){
    let filtrados = this.arquetipos.filter(x=>x.nombre.toLowerCase().includes(this.buscar.toLowerCase()));    // filtra la lista de arquetipos
    this.dataChange.next(filtrados);      // actualiza la lista con la nueva lista filtrada
    if(this.buscar.length==0) this.dataChange.next(this.arquetipos)
  }
  enviarArquetipo(a){     // agrega un arquetipo a una ficha
    a.editable = true;
    this.enviaArquetipo.emit(a);      // envia el arqutipo al componente padre
  }
}
