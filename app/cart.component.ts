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
  <button (click)="checkout()">Checkout</button>
  <button class="homeFadeIn">Close Cart</button>
  <p>Total: \${{getTotal()}}.00</p>
  `
})

export class CartComponent {
  public cart: Array<any>;
  public myDataRef = new Firebase('https://picacause.firebaseio.com/');
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
  }
}
