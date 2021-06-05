import React from 'react'
import axios from 'axios'
// axios api
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;

// Points內容
const PointsContent = ({ url,setPrivateToggle }) =>{
  // 樣式更動
  function PrivateClick() {
    console.log(url);
    ax.post(`/api/v1/pens/${url}/private`)
      .then(res => {
        let isPrivate = res.data.payload.boolean;
        if(isPrivate === true){
          // 開啟鎖頭
          setPrivateToggle(true)
        }else{
          // 關掉鎖頭
          setPrivateToggle(false)
        }
      })
  }
  return(
    <div className="points-content points-content-hidden">
      <div className="points-content-box">
        <button
          className="private-btn"
          onClick={ PrivateClick }
        >
          <div className="lock-icon"><i className="fas fa-lock"></i></div>
          <span>Make Private</span>
          <span className="logo-pro">pro</span>
        </button>

        <button className="delete-btn" data-action="click->delete-pen#popup">
          <div className="trash-icon"><i className="fas fa-trash"></i></div>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

let prev,now,defValue = 0,count= 0;
// Points按鈕
const PointsBtn = () => {
  function handleClick(e) {
    if(defValue === 0){
      defValue++;
      prev = e.currentTarget.parentElement;
    }
    now = e.currentTarget.parentElement;
    if(prev !== now){
      // 打開你現在的現顯示
      nowOpenPoints();
      // 關閉你之前的顯示
      prevClosePoints();
      prev = now;
    }
    else{
      // 切換顯示狀態
      count++;
      if(count>=2){
        // 重複點第二次關掉顯示
        prevClosePoints();
        count = 0;
      }else{
        // 第一次打開顯示
        nowOpenPoints();
        prev = now;
      }
    }
  }
  let nowOpenPoints = () =>{
    now.lastElementChild.classList.remove('points-content-hidden');
    now.firstElementChild.style.backgroundColor= "white";
    now.firstElementChild.classList.add('hover-no-color');
  }
  let prevClosePoints = () =>{
    prev.lastElementChild.classList.add('points-content-hidden');
    prev.firstElementChild.style.backgroundColor= "transparent";
    prev.firstElementChild.classList.remove('hover-no-color');
  }
  // console.log(PointsBtnToggle);
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
const Points = ({ url,setPrivateToggle }) => {
  return(
    <>
      <PointsBtn />
      <PointsContent
        url={url}
        setPrivateToggle={setPrivateToggle}
      />
    </>
  );
};

export default Points