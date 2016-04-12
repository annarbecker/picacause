import { Component } from 'angular2/core';
import { NewCharityComponent } from './new-charity.component';

@Component({
  selector: 'my-app',
  directives: [NewCharityComponent],
  template: `
  <div class="home">
    <p>Site Mission</p>
    <button class="homeNewCharitySlide">Add a new Charity</button>
    <button class="homeCardsSlide">View All Cards</button>
  </div>
  <div class="charity-form">
    <new-charity></new-charity>
    <button class="newCharityHomeSlide">Home</button>
  </div>
  <div class="cards">
    <p>All Cards</p>
    <button class="cardsHomeSlide">Home</button>
  </div>
    `
})

export class AppComponent {

}
