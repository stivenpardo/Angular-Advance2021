import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnDestroy{

  public Title!: string;

  public TitleSubs$ : Subscription | undefined;

  constructor(private router: Router) {
    this.getArgumentRoute();
  }
  ngOnDestroy(): void {
    this.TitleSubs$?.unsubscribe();
  }

  getArgumentRoute() {
    this.TitleSubs$ = this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      )
      .subscribe(({ title }) => {
        this.Title = title;
        document.title = `AdminPro - ${title}`;
      });
  }

}
