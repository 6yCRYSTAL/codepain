document.addEventListener('turbolinks:load' , function(){
  points();
})

// Points component
export default function points() {
  const PointsWrap = document.querySelectorAll('.points-wrap');
  if(PointsWrap){
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
              <button class="private-btn">
                <div class="lock-icon"><i class="fas fa-lock"></i></div>
                <span>Make Private</span>
                <span class="logo-pro">pro</span>
              </button>
              <button class="delete-btn" data-action="click->delete-pen#popup">
                <div class="trash-icon"><i class="fas fa-trash"></i></div>
                <span>Delete</span>
              </button>
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
  const toArray = Array.from(PointsBtn);
  let prev,now,defValue = 0;

  PointsBtn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      const PointsContent = e.currentTarget.nextElementSibling;
      PointsContent.classList.toggle('points-content-hidden');
      // 其他按鈕關掉
      if(defValue === 0){
        defValue++;
        prev = toArray.indexOf(e.currentTarget);
      }
      now = toArray.indexOf(e.currentTarget);
      if(prev !== now){
        toArray[prev].nextElementSibling.classList.add('points-content-hidden');
        toArray[prev].style.backgroundColor = 'inherit';
        prev = now ;
      }
      // 判斷 points-content 樣式
      if(PointsContent.className === "points-content points-content-hidden"){
        e.currentTarget.style.backgroundColor = 'inherit';
        e.currentTarget.classList.remove('hover-no-color');
      }else{
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.classList.add('hover-no-color');
      }
    })
  })
}