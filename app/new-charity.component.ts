import { Component, EventEmitter } from 'angular2/core';
import { Charity } from './charity.model';

@Component({
  selector: 'new-charity',
  outputs: ['onSubmitNewCharity'],
  template:`
    <input placeholder="Name" #newName><br>
    <input placeholder="Mission Statement" #newMission><br>
    <input placeholder="Image" #newImage><br>
    <input placeholder="Contact Email" #newContact><br>
    <input placeholder="Fundraising Goal" #newGoal><br>
    <select #newCategory>
      <option value="youth">Youth Development</option>
      <option value="animals">Animals</option>
      <option value="community">Community</option>
      <option value="enviornment">Environment</option>
    </select><br>
    <input placeholder="Desired photo hashtags" #newHashtag><br>
    <button class="newCharityListSlide" (click)="addCharity(newName, newMission, newImage, newContact, newGoal, newCategory, newHashtag)">Apply</button>
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
    userName.value = "";
    userMission.value = "";
    userImage.value = "";
    userContact.value = "";
    userGoal.value = "";
    userCategory.value = "";
    userHashtag.value = "";
  }
}
