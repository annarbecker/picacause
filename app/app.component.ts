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
  <sign-up (onSubmitNewUser)=createUser($event)></sign-up>
    `
})

export class AppComponent {
  public pics = [];
  public cart = [];
  public cartCount = 0;
  public myDataRef = new Firebase('https://picacause.firebaseio.com/')

  constructor(private http:Http) {}

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    return this.http.get('https://api.instagram.com/v1/tags/charityapp/media/recent?access_token=3128477430.8c5216d.5551b14da14a40ed9c77579a4d83484e').map((res:Response) => res.json()).subscribe(
      // the first argument is a function which runs on success
      data => { this.pics = data.data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log(this.pics)
    );
  }

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
