import { Component } from 'angular2/core';
import { Charity } from './charity.model';

@Component({
  selector: 'charity-details',
  inputs: ['charity'],
  template: `
  <div class="charityGuts">
    <p class="charityHeader">Mission</p>
    <p>{{charity.mission}}</p>
    <p class="charityHeader">Contact</p>
    <p>{{charity.contact}}<p>
    <p class="charityHeader">Category</p>
    <p>{{charity.category}}<p>
    <p class="charityHeader">Goal</p>
    <p>\${{charity.goal}}.00<p>
    <a class="charityHeader" href="{{charity.hashtag}}" target="blank">Learn More</a>
    <button>Support {{charity.name}}</button>
  </div>
  `
})

export class CharityDetailsComponent {

}
