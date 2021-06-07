import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnDestroy {

  public  intervalSub: Subscription | undefined;

  constructor() {   
    // this.returnObervable().pipe(
    //   retry(1)
    // )
    // .subscribe(
    //   value => console.log('sub: ', value),
    //   error => console.error('Error: ', error),
    //   () => console.log('End observer o completed')
    // );
    this.intervalSub = this.returnInterval().subscribe( console.log )
  }

  ngOnDestroy(): void {
    this.intervalSub?.unsubscribe();
  }
  
  returnInterval(): Observable<number>{
    return interval(100)
    .pipe(
      // take(4),
      map(value => value + 1),
      filter(value => (value % 2 == 0) ? true : false ) 
    );
  }

  returnObervable(): Observable<number>{
    let i = -1;

    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i)
        if (i === 4){
          i = 0
          clearInterval(interval)
          observer.complete();
        }
      }, 1000)
    });
  }
}
