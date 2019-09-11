import { Component, OnInit } from '@angular/core';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  constructor(private  _fichaService: FichaService()) { }

  ngOnInit() {
  }

}
