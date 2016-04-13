import { Component } from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';
import { CharityListComponent } from './charity-list.component';
import { SignUpComponent } from './sign-up.component';
import {PicListComponent} from './pic-list.component';
import {CartComponent} from './cart.component';
import {Card} from './card.model';

@Component({
  selector: 'my-app',
  directives: [CharityListComponent, PicListComponent, CartComponent, SignUpComponent],
  template: `

  <header>
    <div class="container header">
      <p class="logo">pica<span>cause</span></p>
      <ul>
        <li><a class="homeSlide" href="#">home</a></li>
        <li><a href="#">about</a></li>
        <li><a href="#">contact</a></li>
      </ul>
    </div>
  </header>
  <section>
    <button class="homeCartShow">Items in cart:{{cartCount}}</button>
    <div class="home">
      <div class="homeNewCharitySlide">
        <img src="../build/img/heart.svg">
      </div>
      <div class="homeCardsSlide">
        <img src="../build/img/heart.svg">
      </div>
    </div>

    <div class="charity-list">
      <charity-list></charity-list>
    </div>
    <div class="cards">
      <p>All Cards</p>
      <pic-list
        [clickedPic]="clickedPic"
        (onAddToCart)=addToCart($event)>
      </pic-list>
    </div>
    <div class="cart">
    <cart [cart]="cart"></cart>
    </div>
  </section>
    `
})

export class AppComponent {
  public pics = [];
  public cart = [];
  public cartCount = 0;
  public myDataRef = new Firebase('https://picacause.firebaseio.com/')

  constructor() {}

  addToCart(clickedPic) {
    console.log('it works');
    console.log(clickedPic);
    this.cart.push(new Card(clickedPic[0].images.standard_resolution.url, clickedPic[0].user.username, "", "", 5, clickedPic[1]));
    console.log(this.cart);
    return this.cartCount = this.cart.length;
  }

  createUser(userArray: Array<any>) {
    var usersRef = this.myDataRef.child("users");
    console.log('it works');
    usersRef.push({
      username: userArray[0],
      password: userArray[1]
    });
  }
}
