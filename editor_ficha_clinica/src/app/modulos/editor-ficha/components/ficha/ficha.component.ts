import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../services/ficha.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})

export class FichaComponent implements OnInit {

  ficha: any;
  rut: "0";

  constructor(
    private _fichaService: FichaService,
    private router: Router
    ) { }

  ngOnInit() {
   
  }
  
    
   
  buscarFicha(){
     this._fichaService.getFichaRut(this.rut).subscribe(f=>{
       if (!f) (async () => {

        const { value: confirm} = await Swal.fire({
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
        
        if (confirm) {
          this.router.navigateByUrl('/paciente');
        }
      })()

      this.ficha = f;
    });
  }

}
