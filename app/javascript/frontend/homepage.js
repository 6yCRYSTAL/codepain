import Typed from 'typed.js';
document.addEventListener('turbolinks:load',function(){
  const CSSTypeAn = document.querySelector('.homepage-code-css .code-content .css-type-an');
  const Type1 = document.querySelector('.homepage-code-css .code-content .css-type1');
  const Type2 = document.querySelector('.homepage-code-css .code-content .css-type2');
  const Type3 = document.querySelector('.homepage-code-css .code-content .css-type3');
  const Type4 = document.querySelector('.homepage-code-css .code-content .css-type4');
  const Type5 = document.querySelector('.homepage-code-css .code-content .css-type5');

  if(CSSTypeAn){
    Type1.innerHTML = ""
    Type2.innerHTML = ""
    Type3.innerHTML = ""
    Type4.innerHTML = ""
    Type5.innerHTML = ""
    let cursors = document.querySelectorAll('span.typed-cursor')
    if(cursors){
      cursors.forEach(cursor => cursor.remove())
    }

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
})