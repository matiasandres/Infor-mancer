import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArquetipoService } from '../../services/arquetipo.service';
import { Arquetipo } from '../../models/arquetipo.model';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/modulos/usuario/services/usuario.service';

@Component({
  selector: 'app-importa-arquetipo',
  templateUrl: './importa-arquetipo.component.html',
  styleUrls: ['./importa-arquetipo.component.css']
})
export class ImportaArquetipoComponent implements OnInit {

  @Output() addArquetipo = new EventEmitter();  //evento para agregar un nuevo arquetipo

  archivo;
  xml;
  arquetipo: Arquetipo = new Arquetipo();  
  nombre = '';
  
  constructor(private _arquetipoService: ArquetipoService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
  }


  sube(f){
    this.arquetipo.campos = [];
    this.archivo = f.target.files[0];
    var reader = new FileReader();
    reader.onloadend = (e)=>{   // termina de leer el archivo
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(reader.result.toString(),"text/xml");   // convierte a formato XML, para leer sus etiquetas
      if(this.archivo.type=='text/xml'){    
        this.xml = this.xmlToJson(xmlDoc);    // convierte a JSON el XML
        for(let a of this.xml['archetype']['ontology']['term_definitions'][0].items){   // busca en el JSON la etiqueta para agregarlo al objeto JSON
          this.arquetipo.campos.push({ 
                                        nombre:       a.items[0]['#text'],
                                        descripcion:  a.items[1]['#text'],
                                        valor:  ''
                                    });
        }
      }
      /* var cortado = reader.result.toString().split('\n');
      var cort =[];
      var incluye = false;
      for(let i in cortado){
        if(incluye){
          cort.push(cortado[i]);
        }
        if(cortado[i].includes('ontology')){  
          incluye = true;
        }
      } */
    };
    reader.readAsText(this.archivo);
  }

  subir(){
    if( !this.arquetipo.nombre ||this.arquetipo.nombre.length==0){    // valida que tenga un nombre el arquetipo nuevo
      return Swal.fire('Error','El Arquetipo debe contener un nombre','error');
    }
    this._arquetipoService.agregarArquetipo(this.arquetipo).subscribe(res=>{
      if(res.ok){
        this.arquetipo = new Arquetipo();
        this.addArquetipo.emit(res.arquetipo);
        return Swal.fire("Exito", `Arquetipo <b> ${res.arquetipo.nombre}</b> agregado Correctamente`, 'success');
      }
      return Swal.fire('Error', res.err,'error');
    })
  }

  xmlToJson(xml) {	
    var obj = {}; // objeto a devolver  
    if (xml.nodeType == 1) { 
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }
    // busca nodos hijos en el XML
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  };
}
