import { Component } from 'angular2/core';
import { Charity } from './charity.model';
import {NewCharityComponent} from './new-charity.component';
import {CharityDetailsComponent} from './charity-details.component';


@Component({
  selector: 'charity-list',
  directives: [NewCharityComponent, CharityDetailsComponent],
  template: `
  <p>Charities</p>
  <div class="charityContainer container">
    <div *ngFor="#currentCharity of charityList" class="charity">
      <img class="charityImage" (click)="charityClicked(currentCharity)" src="{{currentCharity.image}}">
      <charity-details [charity]="currentCharity" *ngIf="currentCharity === selectedCharity"></charity-details>
    </div>
  `
})

export class CharityListComponent {
  public charityList: Charity[];
  public myDataRef = new Firebase('https://picacause.firebaseio.com/');
  public selectedCharity: Charity;

  constructor(){
    this.charityList = [];
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
    });
  }
<<<<<<< HEAD
  createCharity(charityArray: Array<any>): void {
    // this.charityList.push (
    //   new Charity(charityArray[0], charityArray[1], charityArray[2], charityArray[3], charityArray[4], 0, charityArray[5], charityArray[6])
    // );
    var charitiesRef = this.myDataRef.child("charities");
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
=======

>>>>>>> 876f7d27e0e1b757c75cded0f29fe7b54d7292f9
  charityClicked(clickedCharity: Charity) {
    if(this.selectedCharity === clickedCharity) {
      this.selectedCharity = undefined;
    } else {
      this.selectedCharity = clickedCharity;
    }
  }
}
