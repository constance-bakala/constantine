import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clothing-list',
  templateUrl: './dress-list.component.html',
  styleUrls: ['./dress-list.component.css']
})
export class DressListComponent implements OnInit {
  nbDresses = 29;

  constructor() {

  }

  ngOnInit() {
  }

}
