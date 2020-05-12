import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {

  @Input() portfolioLink: string;
  @Input() portfolioImage: string;
  @Input() portfolioName: string;

  constructor() { }

  ngOnInit() {
  }

}
