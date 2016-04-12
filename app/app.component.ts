import { Component } from 'angular2/core';
import { CharityListComponent } from './charity-list.component';

@Component({
  selector: 'my-app',
  directives: [CharityListComponent],
  template: `
  <div class="home">
    <p>Site Mission</p>
    <button class="homeNewCharitySlide">View All Charities</button>
    <button class="homeCardsSlide">View All Cards</button>
  </div>
  <div class="charity-list">
    <charity-list></charity-list>
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
