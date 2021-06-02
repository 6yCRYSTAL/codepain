import React from 'react'
import getLike from '../../frontend/get_like.js'
import points from '../../frontend/points.js'

// 每個 pen
const PenItemContent = (props) => {
  const {html,js,css,title,user_name,random_url,heart_count,comments_count,view_count,setToggle,setData,id,userLike} = props;
  const data = {title,user_name,random_url,heart_count,comments_count,view_count,html,js,css};
  // 判斷自己 id & 所有喜歡的pen ; 沒有 -1 有陣列數
  let haveUserLike = userLike.indexOf(id);

  // 開啟彈跳視窗
  function atAlert() {
    setToggle(true);
    setData(data);
    document.querySelector('body').classList.add('fixed');
  };
  // more 按鈕
  React.useEffect(() =>{
    points();
  })
  return(
    <div className="pen-item">
      <header className="pen-header">
        <h2>{title}</h2>
        <div className="points-wrap points-content-top" data-url={`${random_url}`}>
        </div>
      </header>
      <div className="pen-img">
        <iframe id="grid-iframe" sandbox="allow-scripts" loading="lazy" frameBorder="0" srcDoc={`<html><style>${css}</style><body>${html}</body><script type="text/javascript">${js}</script></html>`}></iframe>
        <a className="cover-link" href={`${user_name}/pen/${random_url}`} />
        <div className="prompt-link">
          <button id="modal-btn" className="modal-btn" onClick={ atAlert }>
            <i className="fas fa-expand-arrows-alt" />
          </button>
        </div>
      </div>
      <footer className="pen-footer">
        <button className="pen-footer-style" data-btn="love" data-url={random_url} onClick={ getLike }>
          <i
            className="fas fa-heart"
            style={{
              color: haveUserLike.toString() === '-1'? "white" : "red"
            }}
          />
          <span className="heart-count">{heart_count}</span>
        </button>
        <a href="#" className="pen-footer-style" data-btn="comments">
          <i className="fas fa-comment" />
          <span>{comments_count}</span>
        </a>
        <a href="#" className="pen-footer-style" data-btn="views">
          <i className="fas fa-eye" />
          <span>{view_count}</span>
        </a>
      </footer>
    </div>
  );
};

export default PenItemContent