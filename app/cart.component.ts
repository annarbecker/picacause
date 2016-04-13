import {Component} from 'angular2/core';
import {Card} from './card.model';


@Component({
  selector: 'cart',
  inputs: ['cart'],
  template: `
  <div *ngFor="#item of cart">
    <p>{{item.photographer}}</p>
  </div>
  `
})

export class CartComponent {

}
