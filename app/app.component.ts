import { Component } from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response} from 'angular2/http';
import { CharityListComponent } from './charity-list.component';
import {PicListComponent} from './pic-list.component';

@Component({
  selector: 'my-app',
  directives: [CharityListComponent, PicListComponent],
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
    <pic-list></pic-list>
  </div>
  <br>
    `
})

export class AppComponent {

}
