import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-jewellery-list',
  templateUrl: './earring-list.component.html',
  styleUrls: ['./earring-list.component.css']
})
export class EarringListComponent implements OnInit {
  nbEaring = 17;

  constructor() {
  }

  ngOnInit() {
  }


}
