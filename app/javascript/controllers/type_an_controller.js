import { Controller } from "stimulus"
import Typed from 'typed.js';
export default class extends Controller {
  static targets = [ "type" ]
  connect(){
    this.typed = new Typed(this.typeTarget, {
        strings: [`
        <span class="code-yellow">.6yCRYSTAL</span> {^2000
        <br><span class="code-purple">background</span>: <span class="code-yellow">linear-gradient</span> (^2000
        <br><span class="code-orange">6deg</span>,^2000
        <br><span class="code-yellow">$gray</span>
        <span class="code-orange">0%</span>,^2000
        <br><span class="code-yellow">$dark-gray </span><span class="code-orange">100%</span>) ;
        `],
        typeSpeed: 30,
        loop: false,
        showCursor: true,
        cursorChar: "|",
        contentType: 'html',
    });
  }
  disconnect(){
    this.typed.cursor.remove();
    this.typed.reset();
  }
}