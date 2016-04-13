import {Component} from 'angular2/core';
import {Card} from './card.model';


@Component({
  selector: 'cart',
  inputs: ['cart'],
  template: `
  <div *ngFor="#item of cart" class="shoppingCart">
    <img src="{{item.image}}">
    <p>Photographer: {{item.photographer}}</p>
    <p>Price: \${{item.price}}</p>
  </div>
  <button class="homeFadeIn">Close Cart</button>
  <p>Total: \${{getTotal()}}.00</p>
  `
})

export class CartComponent {
  public cart: Array<any>;
  getTotal() {
    var total = 0;
    for(var i = 0; i < this.cart.length; i++) {
      total += this.cart[i].price;
    }
    return total;
  }
}
