import {Component, OnInit, Type} from '@angular/core';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.css']
})
export class AdItemComponent implements OnInit {

  constructor(public component: Type<any>, public data: any) { }

  ngOnInit(): void {
  }

}
