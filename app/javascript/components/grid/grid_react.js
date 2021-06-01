import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;
import PenItemContent from './PenItemContent.js'
import PagesBtn from './PagesBtn.js'
import Alert from './Alert.js'

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
        setTotalPage(res.data.payload.meta.totalPages);
        setIsLoading(false);
        // 使用者喜歡哪些 pens 的 id
        res.data.payload.pens[0].user.love_pens.forEach((like) => {
          LikeId.push(like.id);
        });
        setUserLike(LikeId);
        // 清除使用者pen js裡的 console.log()
        // setTimeout( () => {
        //   console.clear()
        // }, 500)
      })
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
      <PagesBtn
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