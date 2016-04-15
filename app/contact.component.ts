import {Component} from 'angular2/core';


@Component({
  selector: 'contact',
  template: `
    <h3 class="container">pic<span class="logoLetter">a</span>cause devs</h3>
    <div class="contactContainer container">
      <div class="person">
        <a href="https://github.com/annarbecker" target="blank"><img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/061/366/2b6d7c6.jpg" alt="Anna Becker"></a>
        <a href="https://github.com/annarbecker" target="blank">Anna Becker</a>
        <p>Junior Web Developer</p>
      </div>
      <div class="person">
        <a href="https://github.com/hiitsdustindavis" target="blank"><img src="https://avatars1.githubusercontent.com/u/16552365?v=3&s=400" alt="Dustin Davis"></a>
        <a href="https://github.com/hiitsdustindavis" target="blank">Dustin Davis</a>
        <p>Junior Web Developer</p>
      </div>
      <div class="person">
        <a href="https://github.com/Rosanio" target="blank"><img src="http://i2.kym-cdn.com/entries/icons/facebook/000/011/732/Screen_shot_2012-11-16_at_2.20.55_PM.png" alt="Matt Rosanio"></a>
        <a href="https://github.com/Rosanio" target="blank">Matt Rosanio</a>
        <p>Junior Web Developer</p>
      </div>
      <div class="person">
        <a href="https://github.com/tcsuder" target="blank"><img src="https://avatars2.githubusercontent.com/u/16562093?v=3&s=460" alt="Tyler Suderman"></a>
        <a href="https://github.com/tcsuder" target="blank">Tyler Suderman</a>
        <p>Junior Web Developer</p>
      </div>

    </div>
  `
})

export class ContactComponent {

}
