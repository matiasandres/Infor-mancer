import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})

export class FichaComponent implements OnInit {

  ficha: any;
  rut = '19.874.598-7';
  constructor(private _fichaService: FichaService) { }

  ngOnInit() {
   
  }

  buscarFicha(){
     this._fichaService.getFichaRut(this.rut).subscribe(f=>{
       if (!f) return Swal.fire({
        
        title: 'Paciente no encontrado',
        type: 'warning',
        text: '¿desea crear paciente?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> si',
        confirmButtonAriaLabel: 'si',
        cancelButtonText:
        '<i class="fa fa-thumbs-down"></i> no',
        cancelButtonAriaLabel: 'no'
       })
      this.ficha = f;
    });
  }

}
