import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'sign-up',
  template: `
    <h4>Sign Up</h4>
    <input placeholder="username" #newUsername>
    <input placeholder="password" type="password" #newPassword>
    <button class="signInFadeOut" (click)="addUser(newUsername, newPassword)">Sign Up!</button>
  `
})

export class SignUpComponent {
  public onSubmitNewUser: EventEmitter<any>;
  constructor() {
    this.onSubmitNewUser = new EventEmitter();
  }
  addUser(username: HTMLInputElement, password: HTMLInputElement) {
    var userArray: Array<any> = [username.value, password.value];
    this.onSubmitNewUser.emit(userArray);
    username.value="";
    password.value="";
  }
}
