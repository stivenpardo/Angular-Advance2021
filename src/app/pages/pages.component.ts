import { Component, OnInit } from '@angular/core';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promise = new Promise((resolve, reject) => {
      if (true) 
        resolve('Hello word');
      else
        reject('Algo salio mal');
    });
    promise
    .then((message) => {
      console.log(message);
    })
    .catch(error => console.error('Error in my promise', error));
    
    console.log('End of Init');
  }
}
