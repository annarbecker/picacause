import { Component } from 'angular2/core';
import { Charity } from './charity.model';
import { NewCharityComponent } from './new-charity.component';


@Component({
  selector: 'charity-list',
  directives: [NewCharityComponent],
  template: `
  <div class="charityList">
    <h4>Charities:</h4>
    <div *ngFor="#currentCharity of charityList">
      <img class="charityImage" src="{{currentCharity.image}}">
      <p>{{currentCharity.name}}</p>
    </div>
    <button class="listNewCharitySlide">New Charity</button>
  </div>
  <div class="newCharity">
    <new-charity (onSubmitNewCharity)="createCharity($event)"></new-charity>
  </div>
  `
})

export class CharityListComponent {
  public charityList: Charity[];
  public myDataRef = new Firebase('https://picacause.firebaseio.com/')

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
  createCharity(charityArray: Array<any>): void {
    // this.charityList.push (
    //   new Charity(charityArray[0], charityArray[1], charityArray[2], charityArray[3], charityArray[4], 0, charityArray[5], charityArray[6])
    // );
    var charitiesRef = this.myDataRef.child("charities");
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
