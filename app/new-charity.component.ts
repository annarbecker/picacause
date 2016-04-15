import { Component, EventEmitter } from 'angular2/core';
import { Charity } from './charity.model';

@Component({
  selector: 'new-charity',
  outputs: ['onSubmitNewCharity'],
  template:`
    <input placeholder="Name" class="input-lg form-control" #newName><br>
    <input placeholder="Mission Statement" class="input-lg form-control" #newMission><br>
    <input placeholder="Image" class="input-lg form-control" #newImage><br>
    <input placeholder="Contact Email" class="input-lg form-control" #newContact><br>
    <input placeholder="Fundraising Goal" class="input-lg form-control" #newGoal><br>
    <select class="form-control" #newCategory>
      <option value="youth">Youth Development</option>
      <option value="animals">Animals</option>
      <option value="community">Community</option>
      <option value="enviornment">Environment</option>
    </select><br>
    <input placeholder="Website URL" class="input-lg form-control" #newHashtag><br>
    <button class="charityApply" (click)="addCharity(newName, newMission, newImage, newContact, newGoal, newCategory, newHashtag)">Apply</button>
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
