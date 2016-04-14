import { Component } from 'angular2/core';
import { Charity } from './charity.model';

///<reference path="jquery.d.ts" />

@Component({
  selector: 'charity-details',
  inputs: ['charity'],
  template: `
  <div class="charity-guts">

    <p>Mission: {{charity.mission}}</p>
    <p>Contact: {{charity.contact}}<p>
    <p>Category: {{charity.category}}<p>
    <a href="{{charity.hashtag}}" target="blank">Learn More</a>

    <p>Amount Raised</p>
    <div class="secured-bar">
      <div class="secured-metrics">
        <div class="amount-secured">
        </div>
        <div class="amount-desired">
        </div>
      </div>
    </div>

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
