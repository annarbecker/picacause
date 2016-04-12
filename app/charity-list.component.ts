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
      <img src="{{currentCharity.image}}">
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
  public charities;

  constructor(){
    this.charityList = [];
  }

  ngOnInit() {
    var charityListClass = this;
    charityListClass.myDataRef.on("value", function(snapshot) {
      charityListClass.charityList = [];
      charityListClass.charities = snapshot.val().charities;
      for(var key in charityListClass.charities) {
        //Skip loop if property is from prototype
        if(!charityListClass.charities.hasOwnProperty(key)) continue;
        var obj = charityListClass.charities[key];
        charityListClass.charityList.push(obj);
        // for(var prop in obj) {
        //   if(!obj.hasOwnProperty(prop)) continue;
        //
        // }
      }
      console.log(charityListClass.charityList);
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
