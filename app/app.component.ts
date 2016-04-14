import { Component } from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';
import { CharityListComponent } from './charity-list.component';
import { SignUpComponent } from './sign-up.component';
import {PicListComponent} from './pic-list.component';
import {CartComponent} from './cart.component';
import {Card} from './card.model';
import {AdminLoginComponent} from './admin-login.component';

@Component({
  selector: 'my-app',
  directives: [CharityListComponent, PicListComponent, CartComponent, SignUpComponent, AdminLoginComponent],
  template: `

  <header>
    <div class="container header">
      <p class="logo homeSlide">pica<span>cause</span></p>
      <ul class="navvy">
        <li><a class="homeSlide" href="#">home</a></li>
        <li><a href="#">about</a></li>
        <li><a href="#">contact</a></li>
        <li><a class="adminFade" href="#">apply</a></li>
      </ul>
      <a href="#" class="homeCartShow nav-cart-icon">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 399.6 399.6" enable-background="new 0 0 399.6 399.6" width="3rem" height="3rem">
      <path id="cart-svg" d="m393.801,71.244c-1.424-1.605-3.466-2.523-5.611-2.523h-315.626l-3.749-31.158c-2.576-21.414-20.784-37.563-42.353-37.563h-15.052c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h15.052c13.985,0 25.791,10.47 27.461,24.355l30.521,253.638c2.682,22.282 21.628,39.085 44.07,39.085h29.225l-3.193,6.047c-2.406-0.597-4.918-0.919-7.506-0.919-17.202,0-31.196,13.995-31.196,31.197s13.994,31.197 31.196,31.197 31.197-13.995 31.197-31.197c0-9.235-4.037-17.542-10.436-23.259l6.899-13.066h154.745l-3.193,6.047c-2.406-0.597-4.918-0.919-7.506-0.919-17.202,0-31.197,13.995-31.197,31.197s13.995,31.197 31.197,31.197 31.197-13.995 31.197-31.197c0-9.235-4.037-17.542-10.436-23.259l6.899-13.066h6.238c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-224.131c-14.858,0-27.402-11.125-29.178-25.877l-4.151-34.493h272.19c3.796,0 6.993-2.835 7.446-6.604l20.815-172.987c0.257-2.13-0.411-4.268-1.834-5.873zm-230.564,297.159c0,8.931-7.266,16.197-16.197,16.197-8.931,0-16.196-7.266-16.196-16.197s7.266-16.197 16.196-16.197c0.023,0 0.046,0.003 0.069,0.003l-6.701,12.691c-1.935,3.663-0.533,8.2 3.13,10.134 1.117,0.59 2.314,0.869 3.495,0.869 2.692,0 5.295-1.454 6.639-4l6.697-12.683c1.804,2.613 2.868,5.775 2.868,9.183zm171.707,0c0,8.931-7.266,16.197-16.197,16.197s-16.197-7.266-16.197-16.197 7.266-16.197 16.197-16.197c0.023,0 0.046,0.003 0.069,0.003l-6.701,12.691c-1.935,3.663-0.533,8.2 3.13,10.134 1.117,0.59 2.314,0.869 3.495,0.869 2.692,0 5.295-1.454 6.639-4l6.697-12.683c1.804,2.613 2.868,5.775 2.868,9.183zm-137.839-284.682h59.893l-4.443,157.987h-51.006l-4.444-157.987zm-10.562,157.987h-43.356l-12.302-157.987h51.214l4.444,157.987zm85.461-157.987h51.214l-12.302,157.987h-43.356l4.444-157.987zm-197.634,0h41.469l12.302,157.987h-34.761l-19.01-157.987zm286.353,157.987h-34.761l12.302-157.987h41.469l-19.01,157.987z" fill="#FFFFFF"/>
      </svg>
      <p id="cart-count">{{cartCount}}</p>
      <p id="open-cart-hover">open cart</p>
      </a>
    </div>
  </header>
  <section>
    <div class="home">
      <div class="homeCardsSlide pointer">
        <div class="home-icon">
          <img src="../resources/img/camera-icon.svg">
          <h4 class="home-icon-title">go to photos</h4>
        </div>
      </div>
      <div class="homeNewCharitySlide pointer">
      <div class="home-icon">
        <img src="../resources/img/heart.svg">
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
    <div class="apply">
      <admin-login (onSubmitNewCharity)="createCharityApplication($event)"></admin-login>
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

  createCharityApplication(charityArray: Array<any>): void {
    var charitiesRef = this.myDataRef.child("charityRequests");
    charitiesRef.push({
      name: charityArray[0],
      mission: charityArray[1],
      image: charityArray[2],
      concat: charityArray[3],
      goal: charityArray[4],
      secured: 0,
      category: charityArray[5],
      hashtag: charityArray[6]
    });
  }
}
