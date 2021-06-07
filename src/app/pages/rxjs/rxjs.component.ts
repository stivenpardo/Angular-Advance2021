import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent {

  constructor() {   
    // this.returnObervable().pipe(
    //   retry(1)
    // )
    // .subscribe(
    //   value => console.log('sub: ', value),
    //   error => console.error('Error: ', error),
    //   () => console.log('End observer o completed')
    // );
    this.returnInterval().subscribe( console.log )
  }
  
  returnInterval(): Observable<number>{
    return interval(1000)
    .pipe(
      take(4),
      map(value => value + 1)
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
