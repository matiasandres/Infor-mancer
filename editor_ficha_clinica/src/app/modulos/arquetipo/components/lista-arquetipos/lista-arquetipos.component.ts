import { Component, OnInit } from '@angular/core';
import { ArquetipoService } from '../../services/arquetipo.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Arquetipo } from '../../models/arquetipo.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lista-arquetipos',
  templateUrl: './lista-arquetipos.component.html',
  styleUrls: ['./lista-arquetipos.component.css']
})
export class ListaArquetiposComponent implements OnInit {

  arquetipos:Arquetipo[];
  treeControl: NestedTreeControl<Arquetipo>;
  dataSource = new MatTreeNestedDataSource<Arquetipo>();
  dataChange: BehaviorSubject<Arquetipo[]> = new BehaviorSubject<Arquetipo[]>([]);
  
  constructor(private _arquetipoService: ArquetipoService) {

    this.treeControl = new NestedTreeControl<Arquetipo>(node => node.campos);
    this.dataChange.subscribe(data=>this.dataSource.data= data);
   }

  
  ngOnInit() {
    this._arquetipoService.getArquetipos().subscribe(res=>{
      console.log(res);
      this.arquetipos = res;
      this.dataChange.next(this.arquetipos);
      this.dataSource.data = this.arquetipos;
    });
  }
  hasChild = (_: number, node: Arquetipo) => !!node.campos && node.campos.length > 0;

  addArquetipo(e){
    this.arquetipos.push(e);
    this.dataChange.next(this.arquetipos);
    console.log("DATA_:::", this.dataSource);
    console.log("ARQQ::",e);
  }
}
