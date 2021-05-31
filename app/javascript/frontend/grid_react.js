import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;
import Alert from './Alert_react.js'
import getLike from './get_like.js'

// 每個 pen 內容
function PenItemContent(props){
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
  return(
    <div className="pen-item">
      <header className="pen-header">
        <h2>{title}</h2>
        <button className="pen-more">
          <svg viewBox="0 0 29 7" title="more">
          <circle cx="3.5" cy="3.5" r="3.5"></circle>
          <circle cx="14.5" cy="3.5" r="3.5"></circle>
          <circle cx="25.5" cy="3.5" r="3.5"></circle>
        </svg>
        </button>
      </header>
      <div className="pen-img">
        <img src="/images/pen-img-default.jpg" />
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
          <span>{heart_count}</span>
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
// 換頁功能
function PageBtn(props) {
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
// pen 的父層
function GridItem() {
  const [grid, setGrid] = React.useState([]);
  const [userLike, setUserLike] = React.useState([]);
  const [allTotalPage, setTotalPage] = React.useState(1);
  const [clickPage, setClickPage] = React.useState(1);
  const [getData, setGetData] = React.useState({});
  const [toggle, setToggle] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  // useEffect 附加 Api 回傳後執行
  React.useEffect(() =>{
    const LikeId = []
    ax.get(`/api/v1/pens/grid/${clickPage}`)
    .then(res =>{
      setGrid(res.data.payload.pens);
      setIsLoading(false)
      setTotalPage(res.data.payload.meta.totalPages);
      // 使用者喜歡哪些 pens 的 id
      res.data.payload.pens[0].user.love_pens.forEach((like) => {
        LikeId.push(like.id);
      });
      setUserLike(LikeId);
    });
  }, [clickPage]);
  // 上下頁功能
  function nextBtn() {
    if (clickPage < allTotalPage) { setClickPage(clickPage + 1) };
  };
  function prevBtn() {
    if (clickPage > 1) { setClickPage(clickPage - 1) };
  };
  // loading
  if(isLoading){
    return(
      <div className="pens-grid-loading"></div>
    )
  }
  return(
    <>
      <div className="pen-items-wrap">
        {
          grid.map((data) =>{
            return(
              <article className="col" key={data.id}>
                <PenItemContent
                  title={data.title}
                  id={data.id}
                  random_url={data.random_url}
                  comments_count={data.comments_count}
                  heart_count={data.heart_lists_count}
                  view_count={data.edit_view_count}
                  user_name={data.user.username}
                  html={data.html}
                  css={data.css}
                  js={data.js}
                  setToggle={setToggle}
                  setData={setGetData}
                  setData={setGetData}
                  userLike={userLike} />
              </article>
            );
          })
        }
      </div>
      <PageBtn
        nextBtn={nextBtn}
        prevBtn={prevBtn}
        currentPage={clickPage}
        allPages={allTotalPage}
      />
      {
        toggle &&
        <Alert
        data= {getData}
        setToggle={setToggle}
        />
      }
    </>
  );
};
document.addEventListener('turbolinks:load',function(){
  const PenItemsWrap = document.querySelector('.pens-grid');
  if (PenItemsWrap) {
    ReactDOM.render(
      <GridItem />,
      PenItemsWrap
    )
  }
})
