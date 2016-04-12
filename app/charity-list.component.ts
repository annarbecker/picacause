import { Component } from 'angular2/core';
import { Charity } from './charity.model';
import {NewCharityComponent} from './new-charity.component';


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

  constructor(){
    this.charityList = [];
  }
  createCharity(charityArray: Array<any>): void {
    this.charityList.push (
      new Charity(charityArray[0], charityArray[1], charityArray[2], charityArray[3], charityArray[4], charityArray[5], charityArray[6], charityArray[7])
    );
  }
}
