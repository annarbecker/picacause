import { Component, EventEmitter } from 'angular2/core';
import { Card } from './card.model';
import { Charity } from './charity.model';

@Component({
  selector: 'pic-details',
  inputs: ['pic'],
  outputs: ['onAddToCart'],
  template: `
    <p>Select Charity</p>
    <select #newCharity>
      <option *ngFor="#charity of charityList" value={{charity.name}}>{{charity.name}}</option>
    </select>
    <button (click)="addToCart(pic, newCharity)" class="addToCart">Add to Cart</button>
  `
})

export class PicDetailsComponent {
  public onAddToCart: EventEmitter<any>;
  public charityList: Charity[];
  public myDataRef = new Firebase('https://picacause.firebaseio.com/');

  constructor() {
    this.onAddToCart = new EventEmitter();
  }
  addToCart(clickedPic, charity): void {
    var cardArray = [clickedPic, charity.value];
    this.onAddToCart.emit(cardArray);
  }
  ngOnInit() {
    var charityListClass = this;

    //this event emitter fires once on page load and every time firebase is updated
    charityListClass.myDataRef.on("value", function(snapshot) {
      //clear charityList array
      charityListClass.charityList = [];
      //save results to array
      var charities = snapshot.val().charities;
      for(var key in charities) {
        //Skip loop if property is from prototype
        if(!charities.hasOwnProperty(key)) continue;
        //save and push each object in charities to charityList
        var obj = charities[key];
        charityListClass.charityList.push(obj);
      }
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      console.log(charityListClass.charityList);
    });
  }
}
