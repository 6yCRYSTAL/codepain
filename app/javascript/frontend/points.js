document.addEventListener('turbolinks:load' , function(){
  points();
})

// Points component
export default function points() {
  const PointsWrap = document.querySelectorAll('.points-wrap');
  const PointsFollowWrap = document.querySelectorAll('.points-follow-wrap');

  if(PointsWrap.length){
    PointsWrap.forEach((wrap) =>{
      wrap.innerHTML= `
        <div class="points-content-wrap">
          <button class="points-btn">
            <svg viewBox="0 0 29 7" width="28" title="points">
              <circle cx="3.5" cy="3.5" r="3.5"></circle>
              <circle cx="14.5" cy="3.5" r="3.5"></circle>
              <circle cx="25.5" cy="3.5" r="3.5"></circle>
            </svg>
          </button>
          <div class="points-content points-content-hidden">
            <div class="points-content-box">
              <button class="private-btn"
              data-action="click->private#togglePrivate"
              data-private-target="privateChecks"
              >
                <div class="lock-icon"><i class="fas fa-lock"></i></div>
                <span>Make Private</span>
                <span class="logo-pro">pro</span>
              </button>
              <button data-action="click->delete-pen#popup">
                <div class="trash-icon"><i class="fas fa-trash"></i></div>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      `
    })
    clickPointsBtn();
  } else if (PointsFollowWrap.length) {
    PointsFollowWrap.forEach((wrap) =>{
      wrap.innerHTML= `
        <div class="points-content-wrap">
          <button class="points-btn" data-action="click->follow#showUser">
            <svg viewBox="0 0 29 7" width="28" title="points">
              <circle cx="3.5" cy="3.5" r="3.5"></circle>
              <circle cx="14.5" cy="3.5" r="3.5"></circle>
              <circle cx="25.5" cy="3.5" r="3.5"></circle>
            </svg>
          </button>
          <div class="points-content points-content-hidden">
            <div class="points-content-box">
              <button class="private-btn">
                <div class="lock-icon"><i class="fas fa-lock"></i></div>
                <span>Make Private</span>
                <span class="logo-pro">pro</span>
              </button>
              <div data-follow-target="followWrap">
              </div>
            </div>
          </div>
        </div>
      `
    })
    clickPointsBtn();
  }
}

// click Points-btn
function clickPointsBtn() {
  const PointsBtn = document.querySelectorAll('.points-btn');
  const toArrayPoints = Array.from(PointsBtn);
  let prev,now,defValue = 0;
  // 點擊外面關掉
  window.addEventListener('click', function(e){
    toArrayPoints.forEach(btn =>{
      if(btn.contains(e.target) === false){
        btn.nextElementSibling.classList.add('points-content-hidden');
        btn.removeAttribute("style");
        btn.classList.remove('hover-no-color');
      }
    })
  });
  // 按鈕點擊
  PointsBtn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      const PointsContent = e.currentTarget.nextElementSibling;
      PointsContent.classList.toggle('points-content-hidden');

      // 其他按鈕關掉
      if(defValue === 0){
        defValue++;
        prev = toArrayPoints.indexOf(e.currentTarget);
      }
      now = toArrayPoints.indexOf(e.currentTarget);
      if(prev !== now){
        toArrayPoints[prev].nextElementSibling.classList.add('points-content-hidden');
        toArrayPoints[prev].removeAttribute("style");
        prev = now ;
      }
      // 判斷 points-content 樣式
      if(PointsContent.className === "points-content points-content-hidden"){
        e.currentTarget.removeAttribute("style");
        e.currentTarget.classList.remove('hover-no-color');
      }else{
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.classList.add('hover-no-color');
      }
    })
  })
}