import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-ad-header',
  templateUrl: './ad-header.component.html',
  styleUrls: ['./ad-header.component.scss']
})
export class AdHeaderComponent implements OnInit, OnDestroy {

  displayHtml = true;

  @Input() data: any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private router: Router) { }

  ngOnInit() {

    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        this. displayHtml = event.snapshot.routeConfig.path.indexOf('home') >= 0;
      });
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
