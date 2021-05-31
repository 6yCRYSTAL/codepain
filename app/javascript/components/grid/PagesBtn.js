import React from 'react'
// 換頁功能
export default function PagesBtn(props) {
  let { nextBtn,prevBtn,currentPage,allPages } = props;
  return(
    <div className="next-prev-btn">
      {/* style < 16 next-btn 消失; > 1 prev-btn 消失; onClick 呼叫 function */}
        <button
          className="prev-btn"
          onClick={ prevBtn }
          style={{
            display: currentPage > 1 ? 'inline-block' : 'none'
          }}>
          <span className="arrow-left"><i className="fas fa-chevron-right" /></span>
          <span>Prev</span>
        </button>
        <button
          className="next-btn"
          onClick={ nextBtn }
          style={{
            display: currentPage < allPages ? 'inline-block' : 'none'
          }}>
          <span>Next</span>
          <i className="fas fa-chevron-right" />
        </button>
    </div>
  );
};

