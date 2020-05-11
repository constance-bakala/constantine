import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masks-list',
  templateUrl: './masks-list.component.html',
  styleUrls: ['./masks-list.component.css']
})
export class MasksListComponent implements OnInit {
  maskInfos = [];
  masksSize = 70;

  constructor() {

  }

  ngOnInit() {
    this.maskInfos = Array(this.masksSize).fill(0).map((x, i) => i); // [0,1,2,3,4];
  }

}
