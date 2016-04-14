import { Component, EventEmitter } from 'angular2/core';
import {NewCharityComponent} from './new-charity.component';
///<reference path="jquery.d.ts" />

@Component({
  selector: 'admin-login',
  outputs: ['onSubmitNewCharity'],
  directives: [NewCharityComponent],
  template: `
    <div class="login">
      <h4>Login:</h4>
      <input placeholder="username" #adminUsername>
      <input placeholder="password" type="password" #adminPassword>
      <button (click)="loginAdmin(adminUsername, adminPassword)">Go!</button>
    </div>
    <div class="userNotFound">
      <p>A user by that name could not be found</p>
    </div>
    <div class="loginFailed">
      <p>Password was incorrect</p>
    </div>
    <div class="adminPage">
      <h4>It works</h4>
      <new-charity (onSubmitNewCharity)="createCharity($event)"></new-charity>
      <h4>Sign up new admin</h4>
      <input placeholder="username" #newAdminUsername>
      <input placeholder="password" type="password" #newAdminPassword>
      <button (click)="createAdmin(newAdminUsername, newAdminPassword)">Go!</button>
      <button (click)="logout()">Logout</button>
    </div>
  `
})

export class AdminLoginComponent {
  public myDataRef = new Firebase('https://picacause.firebaseio.com/');
  public adminList = [];
  public onSubmitNewCharity: EventEmitter<any>;

  constructor() {
    this.onSubmitNewCharity = new EventEmitter();
  }

  loginAdmin(username: HTMLInputElement, password: HTMLInputElement) {
    var adminsRef = this.myDataRef.child("admins");
    var adminClass = this;
    var userFound = false;
    adminsRef.orderByChild('username').equalTo(username.value).on('child_added', function(snapshot) {
      userFound = true;
      if(snapshot.val().password === password.value) {
        $('.login').fadeOut(100, function() {
          $('.adminPage').fadeIn(100);
        });
        $('.loginFailed').hide();
        $('.userNotFound').hide();
      } else {
        $('.loginFailed').show();
        $('.userNotFound').hide();
      }
    });
    if(!userFound) {
      $('.userNotFound').show();
    }
  }

  createCharity(charityArray: Array<any>) {
    this.onSubmitNewCharity.emit(charityArray);
  }

  createAdmin(username: HTMLInputElement, password: HTMLInputElement) {
    var adminsRef = this.myDataRef.child("admins");
    adminsRef.push({
      username: username.value,
      password: password.value
    });
    username.value = "";
    password.value = "";
  }

  logout() {
    $('.adminPage').fadeOut(100, function() {
      $('.login').fadeIn(100);
    });
  }
}
