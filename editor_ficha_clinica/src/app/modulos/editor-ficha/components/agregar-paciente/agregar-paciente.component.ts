import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent implements OnInit {
  paciente: any;

  constructor(private _fichaService: FichaService) { }

  ngOnInit() {
  }
}

