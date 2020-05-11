import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clothing-list',
  templateUrl: './clothing-list.component.html',
  styleUrls: ['./clothing-list.component.css']
})
export class ClothingListComponent implements OnInit {
  clothingInfos = [];
  clothingSize = 38;

  constructor() {

  }

  ngOnInit() {
    this.clothingInfos = Array(this.clothingSize).fill(0).map((x, i) => i); // [0,1,2,3,4];
  }

}
