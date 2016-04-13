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
    <a href="https://www.instagram.com/oauth/authorize/?client_id=8c5216dd5794464581e482d259b9aecf&redirect_uri=http://localhost:3000&response_type=token">Instagram Login</a>
    <a target="blank" href="https://instagram.com/accounts/logout/">Instagram Logou</a>

    <div class="charity-list">
      <charity-list></charity-list>
    </div>
    <div class="cards">
      <p>All Cards</p>
      <pic-list></pic-list>
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
    this.cart.push(new Card(clickedPic.images.standard_resolution.url, clickedPic.user.username, "", "", 5));
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
