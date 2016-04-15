import { Component, EventEmitter } from 'angular2/core';
import {NewCharityComponent} from './new-charity.component';
///<reference path="jquery.d.ts" />

@Component({
  selector: 'admin-login',
  outputs: ['onSubmitNewCharity'],
  directives: [NewCharityComponent],
  template: `
  <h3 class="container pageHeader">apply<span class="logoLetter">a</span>cause</h3>
    <div class="login">
      <h4>Apply to be Added to our List of Charities</h4>
      <new-charity (onSubmitNewCharity)="createCharity($event)"></new-charity>
      <br>
      <br>
      <h4>Admin Login</h4>
      <input placeholder="username" class="form-control" #adminUsername><br>
      <input placeholder="password" type="password" class="form-control" #adminPassword>
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
        <p (click)="selectCharityRequest(currentCharityRequest)" class="charityRequest">{{currentCharityRequest.name}} <span class="approve" (click)="approveCharityRequest(currentCharityRequest)">&#x02713;</span>  <span class="reject" (click)="rejectCharityRequest(currentCharityRequest)">&#x02717;</span></p>
        <div *ngIf="currentCharityRequest === selectedCharityRequest">
          <p><strong>Mission: </strong>{{currentCharityRequest.mission}}</p>
          <p><strong>Category: </strong>{{currentCharityRequest.category}}</p>
          <p><strong>Goal: </strong>{{currentCharityRequest.goal}}</p>
          <p><strong>Contact Info: </strong>{{currentCharityRequest.contact}}</p>
          <p><img src={{currentCharityRequest.image}}></p>
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
  public selectedCharityRequest = undefined;

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

  approveCharityRequest(charityRequest) {
    var charityRef = this.myDataRef.child('charities');
    var charityRequestRef = this.myDataRef.child('charityRequests');
    var charityRequestKey;
    charityRef.push({
      name: charityRequest.name,
      mission: charityRequest.mission,
      category: charityRequest.category,
      contact: charityRequest.contact,
      goal: charityRequest.goal,
      secured: 0,
      image: charityRequest.image,
      hashtag: charityRequest.hashtag
    });
    charityRequestRef.orderByChild('name').equalTo(charityRequest.name).on('child_added', function(snapshot) {
      charityRequestKey = snapshot.key();
    });
    charityRequestRef.child(charityRequestKey).remove();
  }

  rejectCharityRequest(charityRequest) {
    var charityRequestRef = this.myDataRef.child('charityRequests');
    var charityRequestKey;
    charityRequestRef.orderByChild('name').equalTo(charityRequest.name).on('child_added', function(snapshot) {
      charityRequestKey = snapshot.key();
    });
    charityRequestRef.child(charityRequestKey).remove();
  }

  selectCharityRequest(charityRequest) {
    if(this.selectedCharityRequest) {
      this.selectedCharityRequest = undefined;
      console.log('its broken');
    } else {
      this.selectedCharityRequest = charityRequest
      console.log(charityRequest);
    }
  }
}
