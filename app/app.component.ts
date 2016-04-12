import { Component } from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';
import { CharityListComponent } from './charity-list.component';
import {PicListComponent} from './pic-list.component';
import {CartComponent} from './cart.component';
import {Card} from './card.model';

@Component({
  selector: 'my-app',
  directives: [CharityListComponent, PicListComponent, CartComponent],
  template: `
  <button class="homeCartShow">Items in cart:{{cartCount}}</button>
  <div class="home">
    <p>Site Mission</p>
    <button class="homeNewCharitySlide">View All Charities</button>
    <button class="homeCardsSlide">View All Cards</button>
  </div>
  <div class="charity-list">
    <charity-list></charity-list>
    <button class="newCharityHomeSlide">Home</button>
  </div>
  <div class="cards">
    <p>All Cards</p>
    <button class="cardsHomeSlide">Home</button>
    <pic-list
      [cart]="cart"
      (onAddToCart)="addToCart($event)">
    </pic-list>
  </div>
  <div class="cart">
    <cart [cart]="cart"></cart>
    <button class="homeFadeIn">Home</button>
  </div>
  <br>
    `
})

export class AppComponent {
    public cart = [];
    public cartCount = 0;

    addToCart(clickedPic) {
      this.cart.push(new Card(clickedPic.images.standard_resolution.url, clickedPic.user.username, "", "", 5));
      console.log(this.cart);
      return this.cartCount = this.cart.length;
    }
}
