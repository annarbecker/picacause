import {Component, EventEmitter} from 'angular2/core';
import {Card} from './card.model';


@Component({
  selector: 'cart',
  inputs: ['cart'],
  outputs: ['onCheckout'],
  template: `
  <div *ngFor="#item of cart" class="shoppingCart">
    <img src="{{item.image}}">
    <p>Photographer: {{item.photographer}}</p>
    <p>Price: \${{item.price}}</p>
  </div>
  <button (click)="checkout()" class="homeSlide">Checkout</button>
  <button class="homeSlide">Close Cart</button>
  <p>Total: \${{getTotal()}}.00</p>
  `
})

export class CartComponent {
  public cart: Array<any>;
  public onCheckout: EventEmitter<any>;
  public myDataRef = new Firebase('https://picacause.firebaseio.com/');
  constructor() {
    this.onCheckout = new EventEmitter();
  }
  getTotal() {
    var total = 0;
    for(var i = 0; i < this.cart.length; i++) {
      total += this.cart[i].price;
    }
    return total;
  }
  checkout() {
    var cartClass = this;
    for(var i = 0; i < this.cart.length; i++) {
      this.myDataRef.child('charities').orderByChild('name').equalTo(this.cart[i].charities).on('child_added', function(snapshot) {
        var secured = snapshot.val().secured;
        var newSecured = secured + 5;
        var charityRef = cartClass.myDataRef.child('charities').child(snapshot.key());
        charityRef.update({
          "secured": newSecured
        });
      });
    }
    this.cart = [];
    this.onCheckout.emit(0);
  }
}
