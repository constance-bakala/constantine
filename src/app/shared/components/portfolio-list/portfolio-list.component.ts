import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  @Input() size: number;
  @Input() refPrefix: string;
  @Input() directoryName: string;

  indexes: number[];


  constructor() { }

  ngOnInit() {
    this.indexes = Array(this.size).fill(0).map((x, i) => i); // [0,1,2,3,4];
  }

}
