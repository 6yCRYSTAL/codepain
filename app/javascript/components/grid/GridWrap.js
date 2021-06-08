import React from 'react'
import axios from 'axios'
import WorkFeatures from './WorkFeatures.js'
import PenItemContent from './PenItemContent.js'
import PagesBtn from './PagesBtn.js'
import SearchNoResult from './SearchNoResult.js'
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [allValue, setAllValue] = React.useState([]);
  const [searchNoData, setSearchNoData] = React.useState(false);

  // 搜尋、排序值
  let searchValue = allValue[0];
  let sortBy = allValue[1] || 'Date Created';
  let sortDirection = allValue[2] || ' ';

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

      // 準備 css & js CDN 列表
      // 清除使用者pen js裡的 console.log()
      // setTimeout( () => {
      //   console.clear()
      // }, 500)
    })
    .catch( error => {
      if(error instanceof Error) {
        setSearchNoData(true);
      }
    });
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
        setAllValue={ setAllValue }
        setSearchNoData={ setSearchNoData }
      />
      {
        searchNoData &&
        <SearchNoResult
          searchValue={ searchValue }
        />
      }
      <div className="pens-grid-content">
        {/* <SearchToNull /> */}
        <div className="pen-items-wrap">
          {
            grid.map((data) => {
              let resources = data.resources
              let cssList = []
              let jsList = []
              resources.forEach(({id, category, url}) => {
                if (category === 'js') {
                  jsList.push({id, url, category})
                } else {
                  cssList.push({id, url, category})
                }
              })
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
                    isPrivate={data.private}
                    userLike={userLike}
                    cssList={cssList}
                    jsList={jsList}/>
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
      </div>
    </>
  );
};
export default GridItem