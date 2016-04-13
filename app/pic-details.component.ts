import { Component, EventEmitter } from 'angular2/core';
import { Card } from './card.model';


@Component({
  selector: 'pic-details',
  inputs: ['pic'],
  outputs: ['onAddToCart'],
  template: `
    <button (click)="addToCart(pic)">Add to Cart</button>
  `
})

export class PicDetailsComponent {
  public onAddToCart: EventEmitter<any>;
  constructor() {
    this.onAddToCart = new EventEmitter();
  }
  addToCart(clickedPic): void {
    this.onAddToCart.emit(clickedPic);
  }
}
