import { Controller } from "stimulus"
import Typed from 'typed.js';
export default class extends Controller {
  static targets = [ "type1" ]
  connect(){
    this.typed = new Typed(this.type1Target, {
        strings: [`
        <span class="code-yellow">.6yCRYSTAL</span>^2000
        <br><span class="code-purple">background</span>: <span class="code-yellow">linear-gradient</span>
        `],
        typeSpeed: 30,
        loop: false,
        showCursor: true,
        cursorChar: "|",
        contentType: 'html',
        // onComplete: (el) => {
        //   el.cursor.remove()
        // }
    });
  }
  disconnect(){
    this.typed.cursor.remove();
    this.typed.reset();
  }
}