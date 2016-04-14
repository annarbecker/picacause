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
    <div class="adminPage">
      <h4>It works</h4>
      <new-charity (onSubmitNewCharity)="createCharity($event)"></new-charity>
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

  ngOnInit() {
    var adminClass = this;

    //this event emitter fires once on page load and every time firebase is updated
    adminClass.myDataRef.on("value", function(snapshot) {
      //save results to array
      var admins = snapshot.val().admins;
      for(var key in admins) {
        //Skip loop if property is from prototype
        if(!admins.hasOwnProperty(key)) continue;
        //save and push each object in admins to charityList
        var obj = admins[key];
        adminClass.adminList.push(obj);
      }
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  }

  loginAdmin(username: HTMLInputElement, password: HTMLInputElement) {
    var adminsRef = this.myDataRef.child("admins");
    var adminClass = this;
    adminsRef.orderByChild('username').equalTo(username.value).on('child_added', function(snapshot) {
      if(snapshot.val().password === password.value) {
        $('.login').fadeOut(100, function() {
          $('.adminPage').fadeIn(100);
        });
      }
    });
  }

  createCharity(charityArray: Array<any>) {
    this.onSubmitNewCharity.emit(charityArray);
  }
}
