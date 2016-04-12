import {Component, EventEmitter} from 'angular2/core';
import {Charity} from './charity.model';

@Component({
  selector: 'new-charity',
  outputs: ['onSubmitNewCharity'],
  template:`
  <p>Add New Charity</p>
  <input placeholder="Name" #newName>
  <input placeholder="Mission Statement" #newMission>
  <input placeholder="Image" #newImage>
  <input placeholder="Contact Email" #newContact>
  <input placeholder="Fundraising Goal" #newGoal>
  <select #newCategory>
    <option value="youth">Youth Development</option>
    <option value="animals">Animals</option>
    <option value="community">Community</option>
    <option value="enviornment">Environment</option>
  </select>
  <input placeholder="Desired photo hashtags" #newHashtag>
  <button (click)="addCharity(newName, newMission, newImage, newContact, newGoal, newCharity, newHashtag)">Add</button>
  `
})

export class NewCharityComponent {
  public onSubmitNewCharity: EventEmitter<any>;
  constructor() {
    this.onSubmitNewCharity = new EventEmitter();
  }
  addCharity(userName: HTMLInputElement, userMission: HTMLInputElement, userImage: HTMLInputElement, userContact: HTMLInputElement, userGoal: HTMLInputElement, userCategory: HTMLInputElement, userHashtag: HTMLInputElement) {
    var charityArray: Array<any> = [userName.value, userMission.value, userImage.value, userContact.value, userGoal.value, userCategory.value, userHashtag.value];
    this.onSubmitNewCharity.emit(charityArray);
  }
}
