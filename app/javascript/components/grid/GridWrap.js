import React from 'react'
import axios from 'axios'
import WorkFeatures from './WorkFeatures.js'
import PenItemContent from './PenItemContent.js'
import PagesBtn from './PagesBtn.js'
import Alert from './Alert.js'
// axios api
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;

// grid pen
function GridItem() {
  const [grid, setGrid] = React.useState([]);
  const [userLike, setUserLike] = React.useState([]);
  const [allTotalPage, setTotalPage] = React.useState(1);
  const [clickPage, setClickPage] = React.useState(1);
  const [getData, setGetData] = React.useState({});
  const [toggle, setToggle] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [allValue, setAllValue] = React.useState([]);

  // 搜尋、排序值
  let searchValue = allValue[0];
  let sortBy = allValue[1] || 'Date Created';
  let sortDirection = allValue[2] || '';

  // get Api
  React.useEffect(() =>{
    const LikeId = []
    ax.get(`/api/v1/pens/grid/${clickPage}`,{
      params: {
      search_term: `${searchValue}`,
      sort_by: `${sortBy}`,
      sort_order: `${sortDirection}`}
    })
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
  }, [clickPage,allValue]);

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
      <WorkFeatures
        setAllValue={setAllValue}
      />
      <div className="pens-grid-content">
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
          data={getData}
          setToggle={setToggle}
          />
        }
      </div>
    </>
  );
};
export default GridItem