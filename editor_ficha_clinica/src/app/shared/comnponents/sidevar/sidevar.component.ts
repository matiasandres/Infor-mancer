import { Component, OnInit, Input,} from '@angular/core';


@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent implements OnInit {
  @Input() drawer
  constructor() {
   }

  ngOnInit() {
  }
}
