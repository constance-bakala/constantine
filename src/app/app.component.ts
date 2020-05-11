import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-angular';

  constructor(
    private router: Router,
  ) {
  }

  navigateToPortFolio() {
    this.router.navigate(['/root/child/child']);
  }
}
