import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  disposition = 'col-md-6 col-lg-4 mb-5';
  //disposition = 'col-md-4 col-lg-3 mb-5';

  constructor() { }

  ngOnInit() {
  }

}
