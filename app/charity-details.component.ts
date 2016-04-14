import { Component } from 'angular2/core';
import { Charity } from './charity.model';

///<reference path="jquery.d.ts" />

@Component({
  selector: 'charity-details',
  inputs: ['charity'],
  template: `
  <div class="charityGuts">
    <p class="charityHeader">Mission</p>
    <p>{{charity.mission}}<a href="{{charity.hashtag}}" target="blank"> Learn More</a></p>

    <p class="charityHeader">Contact</p>
    <p>{{charity.contact}}<p>
    <p class="charityHeader">Category</p>
    <p>{{charity.category}}<p>


    <p class="charityHeader">Amount Raised</p>
    <p class="charityHeader">Goal</p>
    <p>\${{charity.goal}}.00<p>
    <div class="secured-metrics">
      <div class="amount-secured">
      </div>
      <div class="amount-desired">
      </div>
    </div>

    <button>Support {{charity.name}}</button>
  </div>
  `
})

export class CharityDetailsComponent {
  public myDataRef = new Firebase('https://picacause.firebaseio.com/');
  public charity: Charity;
  public percentage;
  ngOnInit(){
    var charitiesRef = this.myDataRef.child("charities");
    var detailsClass = this;
    charitiesRef.orderByChild("name").equalTo(this.charity.name).on("child_added", function(snapshot){
      detailsClass.percentage = (snapshot.val().secured / snapshot.val().goal) * 100;
    });
    $(".amount-secured").css("width", this.percentage + "%");
  }

}
