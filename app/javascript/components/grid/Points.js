import React from 'react'
import axios from 'axios'
import Turbolinks from 'turbolinks'
// axios api
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;

const LockBtn = ()=>{
  return(
    <>
      <div className="lock-icon"><i className="fas fa-lock"></i></div>
      <span>Make Private</span>
    </>
  )
}
const UnlockBtn = ()=>{
  return(
    <>
      <div className="lock-icon"><i className="fas fa-eye"></i></div>
      <span>Make Public</span>
    </>
  )
}
// Points內容
const PointsContent = ({url, setPrivateToggle, privateToggle}) => {
  // 樣式更動
  function PrivateClick() {
    ax.post(`/api/v1/pens/${url}/private`)
    .then(res => {
      setPrivateToggle(res.data.payload.boolean)
    })
    .catch(() => {
      Turbolinks.visit('/accounts/pro', 'replace')
    })
  }
  return(
    <div className="points-content points-content-hidden">
      <div className="points-content-box">
        <button
          className="private-btn"
          onClick={ PrivateClick }
        >
          {/* 按鈕文字判斷 */}
          { privateToggle ? <UnlockBtn/> : <LockBtn/> }
          <span
            className="logo-pro"
            style={{
              visibility: privateToggle && 'hidden',
            }}
          >pro</span>
        </button>

        <button className="delete-btn" data-action="click->delete-pen#popup">
          <div className="trash-icon"><i className="fas fa-trash"></i></div>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

let prevEl,nowEl,defValue = 0,swCount= 0;
// Points按鈕
const PointsBtn = () => {
  window.addEventListener("click",function() {
    if(prevEl){
      prevClosePoints();
      swCount = 0;
    }
  })
  function handleClick(e) {
    e.stopPropagation();
    // 一次性執行
    if(defValue === 0){
      defValue++;
      prevEl = e.currentTarget.parentElement;
    }
    nowEl = e.currentTarget.parentElement;
    if(prevEl !== nowEl){
      // 打開你現在的現顯示
      nowOpenPoints();
      // 關閉你之前的顯示
      prevClosePoints();
      prevEl = nowEl;
      swCount = 1;
    }else{
      // 切換顯示狀態
      swCount++;
      if(swCount>=2){
        // 重複點第二次關掉顯示
        prevClosePoints();
        swCount = 0;
      }else{
        // 第一次打開顯示
        nowOpenPoints();
        prevEl = nowEl;
      }
    }
  }
  let nowOpenPoints = () =>{
    nowEl.lastElementChild.classList.remove('points-content-hidden');
    nowEl.firstElementChild.style.backgroundColor= "white";
    nowEl.firstElementChild.classList.add('hover-no-color');
  }
  let prevClosePoints = () =>{
    prevEl.lastElementChild.classList.add('points-content-hidden');
    prevEl.firstElementChild.style.backgroundColor= "transparent";
    prevEl.firstElementChild.classList.remove('hover-no-color');
  }

  return(
    <button
      className="points-btn p-1"
      onClick={ handleClick }
    >
      <svg viewBox="0 0 29 7" width="28" title="points">
        <circle cx="3.5" cy="3.5" r="3.5"></circle>
        <circle cx="14.5" cy="3.5" r="3.5"></circle>
        <circle cx="25.5" cy="3.5" r="3.5"></circle>
      </svg>
    </button>
  );
};

// points 功能
const Points = ({ url,setPrivateToggle,privateToggle }) => {
  return(
    <>
      <PointsBtn />
      <PointsContent
        url={ url }
        setPrivateToggle={ setPrivateToggle }
        privateToggle={ privateToggle }
      />
    </>
  );
};

export default Points