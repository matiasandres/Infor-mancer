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
  constructor(
    private _noticiaService:NoticiasService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    //cambiar segun el formulario de noticias 
    this.noticiasForm = this.formBuilder.group({    // Crea el formulario reactivo con validaciones y datos iniciales
      titulo: ['Titulo de la Noticia ', Validators.required],
      resumen: ['Fonasa', Validators.required],
      cuerpo: ['Cuerpo',Validators.required],
      imagen: ['A', Validators.required],

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
        Swal.fire('subido ')
      }
    })
  }

}
