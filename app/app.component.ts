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
import {AdminLoginComponent} from './admin-login.component';
import {ContactComponent} from './contact.component';

@Component({
  selector: 'my-app',
  directives: [CharityListComponent, PicListComponent, CartComponent, SignUpComponent, svgCartComponent, svgHeartComponent, svgCameraComponent, AdminLoginComponent, ContactComponent],
  template: `
  <header>
    
    <div class="container">
      <div class="header">
        <p class="logo homeSlide"><span>pic</span><span class="logo-medblue">a</span><span class="logo-lightblue"span>cause</span></p>

<!-- ••••• Nav Bar ••••• -->
        <div class="navvy">
          <ul>
            <li><a class="homeSlide" href="#">home</a></li>
            <li><a data-toggle="modal" data-target="#myModal">about</a></li>
            <li><a href="#" class="contactFade">contact</a></li>
            <li><a class="adminFade" href="#">apply</a></li>
          </ul>
          <a href="#" class="homeCartShow nav-cart-icon">
            <svg-cart class=svgCart></svg-cart>
            <p id="cart-count">{{cartCount}}</p>
            <p id="open-cart-hover">open cart</p>
          </a>
        </div>

<!-- ••••• Nav Bar Collapse ••••• -->
        <div class="nav-collapse">
          <span class="nav-collapse-icon">&equiv;</span>
          <ul class="nav-collapse-dropdown">
            <li class="homeSlide">home</li>
            <li>about</li>
            <li class="contactFade">contact</li>
            <li class="adminFade">apply</li>
          </ul>
        </div>
      </div>
    </div>
  </header>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          <h1>Welcome to Pic-A-Cause!</h1>
          <p>We host fund-raising campaigns for charities, selling prints photographed by supporters through instagram.</p>
        </div>
      </div>
      <div class="modal-body">
        <div class="mission row">
          <h4>Getting Involved</h4>
          <p>Support charities in your area by hashtagging instagram photos to benefit one of picacause's hosted charities. Tagged photos are posted for sale in our gallery and 100% of the proceeds benefit the charity of the supporter's choice. If you're a charitable organization, apply to be a featured charity on the site and lower the barrier to contribution for your organization. Picacause makes it easy for new, young, and creative supporters to get involved in your cause!</p>
        </div>
        <div class="mission row">
          <h4>Navigating the App</h4>
          <div class="col col-left col-xs-6">
            <svg-camera class=svgCamera></svg-camera>
            <p>Buy a print</p>
          </div>
          <div class="col col-right col-xs-6">
            <svg-heart class=svgHeart></svg-heart>
            <p>Support a charity</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  <section>

<!-- ••••• Home Page ••••• -->
    <div class="home">
      <div class="homeCardsSlide">
        <div class="home-to-pics">
          <div class="home-icon">
            <svg-camera class=svgCamera></svg-camera>
            <h4 class="home-icon-title">go to photos</h4>
          </div>
        </div>
      </div>
      <div class="homeNewCharitySlide">
        <div class="home-to-charities">
          <div class="home-icon">
            <svg-heart class=svgHeart></svg-heart>
            <h4 class="home-icon-title">go to charities</h4>
            </div>
          </div>
        </div>
      </div>

<!-- ••••• Charities Page ••••• -->
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
    <div class="contact">
      <contact></contact>
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
      contact: charityArray[3],
      goal: charityArray[4],
      secured: 0,
      category: charityArray[5],
      hashtag: charityArray[6]
    });
  }
}
