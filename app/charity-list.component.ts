import { Component } from 'angular2/core';
import { Charity } from './charity.model';
import {NewCharityComponent} from './new-charity.component';
import {CharityDetailsComponent} from './charity-details.component';


@Component({
  selector: 'charity-list',
  directives: [NewCharityComponent, CharityDetailsComponent],
  template: `
    <div class="charityContainer container">
      <div *ngFor="#currentCharity of charityList" class="charity">
        <img class="charityImage" (click)="charityClicked(currentCharity)" src="{{currentCharity.image}}">
        <div *ngIf="currentCharity === selectedCharity">
          <charity-details [charity]="currentCharity" *ngIf="currentCharity === selectedCharity"></charity-details>
          <button (click)="charityListClicked(currentCharity)" class="viewCharities">return to all charities</button>
        </div>
      </div>
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

  charityClicked(clickedCharity: Charity) {
    if(this.selectedCharity === clickedCharity) {
      this.selectedCharity = undefined;
    } else {
      this.selectedCharity = clickedCharity;
    }
  }

  charityListClicked(clickedCharity: Charity) {
    if(this.selectedCharity === clickedCharity) {
      this.selectedCharity = undefined;
    } else {
      this.selectedCharity = clickedCharity;
    }
  }
}
