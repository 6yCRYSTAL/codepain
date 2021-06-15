import { Controller } from "stimulus"
import Typed from 'typed.js';
export default class extends Controller {
  static targets = [ "type1", "type2", "type3","type4", "type5" ]
  connect(){
    const Type1 = this.type1Target
    const Type2 = this.type2Target
    const Type3 = this.type3Target
    const Type4 = this.type4Target
    const Type5 = this.type5Target
    setTimeout(function(){
      new Typed(Type1, {
          strings: [`<span class="code-yellow">.6yCRYSTAL</span>`],
          typeSpeed: 30,
          loop: false,
          cursorChar: "|",
          contentType: 'html'
      });
    }, 0);
    setTimeout(function(){
      Type1.nextElementSibling.style.display = 'none';
      new Typed(Type2, {
          strings: [`
          <span class="code-purple">background</span>:
          <span class="code-yellow">linear-gradient</span>(`],
          typeSpeed: 30,
          loop: false,
          cursorChar: "|",
          contentType: 'html'
      });
    }, 2000);
    setTimeout(function(){
      Type2.nextElementSibling.style.display = 'none';
      new Typed(Type3, {
          strings: [`
          <span class="code-orange">6deg</span>,`],
          typeSpeed: 30,
          loop: false,
          cursorChar: "|",
          contentType: 'html'
      });
    }, 4000);
    setTimeout(function(){
      Type3.nextElementSibling.style.display = 'none';
      new Typed(Type4, {
          strings: [`
          <span class="code-yellow">$gray</span>
          <span class="code-orange">0%</span>`],
          typeSpeed: 30,
          loop: false,
          cursorChar: "|",
          contentType: 'html'
      });
    }, 6000);
    setTimeout(function(){
      Type4.nextElementSibling.style.display = 'none';
      new Typed(Type5, {
          strings: [`
          <span class="code-yellow">$dark-gray </span><span class="code-orange">100%</span>);`],
          typeSpeed: 30,
          loop: false,
          cursorChar: "|",
          contentType: 'html'
      });
    }, 8000);
  }
}