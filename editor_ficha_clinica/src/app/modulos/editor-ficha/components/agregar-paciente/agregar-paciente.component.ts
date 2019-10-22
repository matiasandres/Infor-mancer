import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../../models/paciente.model';
import { Ficha } from '../../models/ficha.model';
import { UsuarioService } from 'src/app/modulos/usuario/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  ficha;
  rut='';
  constructor(private _fichaService: FichaService,
    public _usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.rut = params['rut']; // recibe la variable de la url para completar en formulario
    });

    this.pacienteForm = this.formBuilder.group({    // Crea el formulario reactivo con validaciones y datos iniciales
      nombre: ['',Validators.required],
      rut: [this.rut,Validators.required],
      direccion: [''],
      fecha_nacimiento: [new Date(), Validators.required],
      prevision: ['Fonasa', Validators.required],
      estatura_paciente: ['100',Validators.required],
      grupo_sangre: ['A', Validators.required],
      rh: ['+', Validators.required],
      fono: ['',Validators.required],
      genero: ['Masculino'],
    });
  }

  agregarPaciente(){
    let newPaciente: Paciente = {     // crea el nuevo objeto Paciente con los datos del formulario
      nombre:                 this.pacienteForm.value.nombre,
      rut:                    this.pacienteForm.value.rut,
      genero:                 this.pacienteForm.value.genero,
      direccion:              this.pacienteForm.value.direccion,
      fecha_nacimiento:       this.pacienteForm.value.fecha_nacimiento,
      prevision:              this.pacienteForm.value.prevision,
      estatura_paciente:      this.pacienteForm.value.estatura_paciente,
      grupo_sangre:           this.pacienteForm.value.grupo_sangre,
      rh:                     this.pacienteForm.value.rh,
      fono:                   this.pacienteForm.value.fono
    };
    this._fichaService.agregarPaciente(newPaciente).subscribe(res=>{
      if(!res.ok) return Swal.fire('Error', res.err.message,'error');   // termina la instruccion si recibe algun error muestra alerta
      let newFicha: Ficha = {     // crea la nueva ficha con los datos del paciente recientemente agregado
                            folio: 0, 
                            paciente: res.paciente._id, 
                            fecha_ingreso: new Date(), 
                            arquetipos: [], 
                            last_update: new Date()
                          };
      this._fichaService.agregarFicha(newFicha).subscribe(resp=>{   // genera la ficha con la peticion a la API
          Swal.fire('Todo Bien', `Paciente <b>${res.paciente.rut}</b> Creado Correctamente`).then(r=> this.router.navigate(['ficha']));
      });
    });
  }

  
}

