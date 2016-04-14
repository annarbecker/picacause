import { Component, EventEmitter } from 'angular2/core';
import {NewCharityComponent} from './new-charity.component';
///<reference path="jquery.d.ts" />

@Component({
  selector: 'admin-login',
  outputs: ['onSubmitNewCharity'],
  directives: [NewCharityComponent],
  template: `
    <div class="login">
      <h3>Apply to be Added to our List of Charities</h3>
      <new-charity (onSubmitNewCharity)="createCharity($event)"></new-charity>
      <h4>Admin Login</h4>
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
    <h3>Welcome {{currentAdmin}}</h3>
      <br>
      <h4>Charity Applications:</h4>
      <div *ngFor="#currentCharityRequest of charityRequestList">
        <p (click)="selectCharityRequest(currentCharity)">{{currentCharityRequest.name}} <span class="approve"></span>  <span class="reject">X</span></p>
        <div *ngIf="currentCharityRequest === selectedCharityRequest">

        </div>
      </div>
      <br>
      <br>
      <h4>Sign up new admin</h4>
      <input placeholder="username" #newAdminUsername>
      <input placeholder="password" type="password" #newAdminPassword>
      <button (click)="createAdmin(newAdminUsername, newAdminPassword)">Go!</button>
      <br>
      <br>
      <button (click)="logout()">Logout</button>
    </div>
  `
})

export class AdminLoginComponent {
  public myDataRef = new Firebase('https://picacause.firebaseio.com/');
  public charityRequestList = [];
  public onSubmitNewCharity: EventEmitter<any>;
  public currentAdmin: string;

  constructor() {
    this.onSubmitNewCharity = new EventEmitter();
  }

  ngOnInit() {
    var adminClass = this;

    //this event emitter fires once on page load and every time firebase is updated
    adminClass.myDataRef.on("value", function(snapshot) {
      //clear charityList array
      adminClass.charityRequestList = [];
      //save results to array
      var charityRequests = snapshot.val().charityRequests;
      for(var key in charityRequests) {
        //Skip loop if property is from prototype
        if(!charityRequests.hasOwnProperty(key)) continue;
        //save and push each object in charities to charityList
        var obj = charityRequests[key];
        adminClass.charityRequestList.push(obj);
      }
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  loginAdmin(username: HTMLInputElement, password: HTMLInputElement) {
    var adminsRef = this.myDataRef.child("admins");
    var adminClass = this;
    var userFound = false;
    adminsRef.orderByChild('username').equalTo(username.value).on('child_added', function(snapshot) {
      userFound = true;
      if(snapshot.val().password === password.value) {
        adminClass.currentAdmin = snapshot.val().username;
        $('.login').fadeOut(100, function() {
          $('.adminPage').fadeIn(100);
          username.value = "";
          password.value = "";
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
    this.currentAdmin = "";
    $('.adminPage').fadeOut(100, function() {
      $('.login').fadeIn(100);
    });
  }
}
