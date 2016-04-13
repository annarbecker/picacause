import { Component } from 'angular2/core';
import { Charity } from './charity.model';

@Component({
  selector: 'charity-details',
  inputs: ['charity'],
  template: `
  <p>{{charity.mission}}</p>
  <p>{{charity.contact}}<p>
  <p>{{charity.category}}<p>
  <button>Add to Cart</button>
  `
})

export class CharityDetailsComponent {

}
