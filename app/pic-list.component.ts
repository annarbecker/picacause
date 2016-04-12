import {Component, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Card} from './card.model';
import {Http, Response} from 'angular2/http';

@Component ({
  selector: 'pic-list',
  outputs: ['onAddToCart'],
  template: `
  <div class="picList">
    <h2>API test</h2>
    <div *ngFor="#currentPic of pics">
      <img src="{{currentPic.images.standard_resolution.url}}" (click)="addToCart(currentPic)">
    </div>
  </div>
  `
})

export class PicListComponent {
  public pics = [];
  public onAddToCart: EventEmitter<any>;
  constructor(private http:Http) {
    this.onAddToCart = new EventEmitter();
  }

  ngOnInit() {
    this.getPics();
  }

  getPics() {
    return this.http.get('https://api.instagram.com/v1/tags/charityapp/media/recent?access_token=3128477430.8c5216d.5551b14da14a40ed9c77579a4d83484e').map((res:Response) => res.json()).subscribe(
      // the first argument is a function which runs on success
      data => { this.pics = data.data},
      // the second argument is a function which runs on error
      err => console.error(err)
      // the third argument is a function which runs on completion
      // () => console.log(this.pics)
    );
  }

  addToCart(clickedPic): void {
    this.onAddToCart.emit(clickedPic);
  }
}
