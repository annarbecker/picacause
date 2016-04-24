import {Component, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Card} from './card.model';
import {Http, Response} from 'angular2/http';
import {PicDetailsComponent} from './pic-details.component'

@Component ({
  selector: 'pic-list',
  outputs: ['onAddToCart'],
  directives: [PicDetailsComponent],
  template: `
  <h3 class="container pageHeader">pic<span class="logoLetter">a</span>print</h3>
  <div class="checkoutBtns instaBtns">
  <button (click)="signIn()">
    <a>
      Instagram Login
    </a>
  </button>
  <button
  (click)="signOut()"><a>Instagram Logout</a></button>
</div>
  <div class="picContainer container">
    <div *ngFor="#currentPic of pics" class="picture">
      <img src="{{currentPic.images.standard_resolution.url}}" (click)="picClicked(currentPic)" class="picImage">
      <div *ngIf="currentPic === selectedPic">
        <button (click)="linkClicked(currentPic)" class="returnToCards">return to all cards</button>
        <pic-details [pic]="currentPic" (onAddToCart)="addToCart($event)"></pic-details>
      </div>
    </div>
  </div>
  `
})

export class PicListComponent {
  public token = 'access_token=3128477430.8c5216d.5551b14da14a40ed9c77579a4d83484e';
  public pics = [];
  public onAddToCart: EventEmitter<any>;
  public myDataRef = new Firebase('https://picacause.firebaseio.com/')
  public selectedPic: Card;
  constructor(private http:Http) {
    this.onAddToCart = new EventEmitter();
  }

  ngOnInit() {
    var userToken = window.location.href;
    if (window.location.href.length > 25) {
      this.token = userToken.slice(23);
    }

    this.getPics();
  }

  getPics() {
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent?' + this.token + '&count=18').map((res:Response) => res.json()).subscribe(
      // the first argument is a function which runs on success
      data => { this.pics = data.data},
      // the second argument is a function which runs on error
      err => console.error(err)
      // the third argument is a function which runs on completion
      // () => console.log(this.pics)
    );
  }

  picClicked(clickedPic: Card) {
    if(this.selectedPic === clickedPic) {
      this.selectedPic = undefined;
    } else {
      this.selectedPic = clickedPic;
    }
  }

  linkClicked(clickedPic: Card) {
    if(this.selectedPic === clickedPic) {
      this.selectedPic = undefined;
    } else {
      this.selectedPic = clickedPic;
    }
  }

  addToCart(pic: Card) {
    this.onAddToCart.emit(pic);
  }

  signOut() {
//this code is being left because I want to know how it works

    // var a = document.createElement("a");
    // a.href = "https://instagram.com/accounts/logout/";
    // var evt = document.createEvent("MouseEvents");
    // //the tenth parameter of initMouseEvent sets ctrl key
    // evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
    //                             true, false, false, false, 0, null);
    // a.dispatchEvent(evt);

    var wnd = window.open("https://instagram.com/accounts/logout/")

    setTimeout(function() {
      console.log('it works');
      wnd.close()
      window.location.href="http://localhost:3000/";
    }, 5);
  }

  signIn() {
    this.myDataRef.child("instagramState").on("value", function(snapshot) {
      console.log(snapshot.val());
    })
    this.myDataRef.child("instagramState").update({"loginState": "login"});
    var wnd = window.open("https://www.instagram.com/oauth/authorize/?client_id=8c5216dd5794464581e482d259b9aecf&redirect_uri=http://localhost:3000&response_type=token");
  }
}
