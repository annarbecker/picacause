import { Component } from 'angular2/core';
import { Charity } from './charity.model';

@Component({
  selector: 'charity-details',
  inputs: ['charity'],
  template: `
  <p>Mission: {{charity.mission}}</p>
  <p>Contact: {{charity.contact}}<p>
  <p>Category: {{charity.category}}<p>
  <a href="{{charity.hashtag}}" target="blank">Learn More</a>
  `
})

export class CharityDetailsComponent {

}
