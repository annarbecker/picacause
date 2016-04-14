import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';
import {CharityListComponent} from './charity-list.component';
import {SignUpComponent} from './sign-up.component';
import {PicListComponent} from './pic-list.component';
import {svgCartComponent} from './svg-cart.component';
import {svgHeartComponent} from './svg-heart.component';
import {svgCameraComponent} from './svg-camera.component';
import {CartComponent} from './cart.component';
import {Card} from './card.model';

@Component({
  selector: 'my-app',
  directives: [CharityListComponent, PicListComponent, CartComponent, SignUpComponent, svgCartComponent, svgHeartComponent, svgCameraComponent],
  template: `

  <header>
    <div class="container header">
      <p class="logo homeSlide">pica<span>cause</span></p>
      <ul class="nav">
        <li><a class="homeSlide" href="#">home</a></li>
        <li><a data-toggle="modal" data-target="#myModal">about</a></li>
        <li><a href="#">contact</a></li>
      </ul>
      <a href="#" class="homeCartShow nav-cart-icon">
      <svg-cart id=svgCart></svg-cart>
      <p id="cart-count">{{cartCount}}</p>
      <p id="open-cart-hover">open cart</p>
      </a>
    </div>
  </header>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          <div id="welcome">
            <h4>Welcome to PicaCause!</h4>
          </div>
       </div>
      </div>
      <div class="modal-body">
      <div class="whoAreYou">
        <h5>Are you a charity?</h5>
        <object>
        <img src="../resources/img/heart.svg">
        </object>
        <svg-heart></svg-heart>
        <h5> We're lowering the barrier of contribution.</h5>
      </div>
      <div class="whoAreYou">
        <h5>Do you want to contribute? Harness the value of your creativity for good!</h5>
      </div>
      </div>
    </div>

  </div>
</div>
  <section>
    <div class="home">
      <div class="homeCardsSlide pointer">
        <div class="home-icon">
          <svg-camera></svg-camera>
          <h4 class="home-icon-title">go to photos</h4>
        </div>
      </div>
      <div class="homeNewCharitySlide pointer">
      <div class="home-icon">
        <svg-heart></svg-heart>
        <h4 class="home-icon-title">go to charities</h4>
      </div>
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
      <cart [cart]="cart" (onCheckout)="clearCart($event)"></cart>
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
  clearCart(number) {
    this.cartCount = 0;
    this.cart = [];
  }
}
