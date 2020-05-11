import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-jewellery-list',
  templateUrl: './jewellery-list.component.html',
  styleUrls: ['./jewellery-list.component.css']
})
export class JewelleryListComponent implements OnInit {
  jewelleryInfos = [];
  jewellerySize = 17;

  constructor() {

  }

  ngOnInit() {
    this.jewelleryInfos = Array(this.jewellerySize).fill(0).map((x, i) => i); // [0,1,2,3,4];
  }


}
