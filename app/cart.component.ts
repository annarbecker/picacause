import { Component } from 'angular2/core';

@Component({
  selector: 'cart',
  template: `
  <div *ngFor="#item of cart">
    <h2>{{item.photographer}}
  </div>
  `
})

export class CartComponent {

}
