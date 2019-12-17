import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Noticia } from '../../models/noticia.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-noticia',
  templateUrl: './subir-noticia.component.html',
  styleUrls: ['./subir-noticia.component.css']
})

export class SubirNoticiaComponent implements OnInit {
  noticiasForm:FormGroup;
  public filesToUpload: Array<File> = [];

  constructor(
    private _noticiaService:NoticiasService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    //cambiar segun el formulario de noticias 
    this.noticiasForm = this.formBuilder.group({    // Crea el formulario reactivo con validaciones y datos iniciales
      titulo: ['', Validators.required],  
      resumen: ['', Validators.required],
      cuerpo: ['',Validators.required],
      imagen: ['a/a/no-photo.jpg', Validators.required],    // dato por defecto de la foto
    });
  }

  subir(){
    let newNoticia: Noticia = {     // crea el nuevo objeto Paciente con los datos del formulario
      titulo:                 this.noticiasForm.value.titulo,
      resumen:                this.noticiasForm.value.resumen,
      cuerpo:                 this.noticiasForm.value.cuerpo,
      imagen:                 this.noticiasForm.value.imagen,
    };
    
      this._noticiaService.agregarNoticia(newNoticia).subscribe(res=>{
        if(res.ok){
          Swal.fire('subido ');   // mustra mensaje cuando la peticion se realizo correctamente
          if (this.filesToUpload.length > 0){     // si agrega una foto envia la peticion para modificar y subir la foto al servidor
            this._noticiaService.putModificarNoticia(res.noticia, this.filesToUpload).subscribe();
          }
        }
      });
    
  }
  fileChangeEvent(filesInput: any) {     // agrega los archivos al arreglo para luego subirlos al servidor
    this.filesToUpload = filesInput.target.files;
}


}
