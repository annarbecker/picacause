import { Component } from 'angular2/core';
import { NewCharityComponent } from './new-charity.component';

@Component({
  selector: 'my-app',
  directives: [NewCharityComponent],
  template: `
  <div class="home">
    <p>Site Mission</p>
    <button class="homeNewCharitySlide">Add a new Charity</button>
    <div class="charity-form">
      <new-charity></new-charity>
    </div>
    <button class="homeCardsSlide">View All Cards</button>
    <div class="cards">
      <p>All Cards</p>
    </div>
  </div>
    `
})

export class AppComponent {

}
