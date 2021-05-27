import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;
import Alert from './Alert_react.js'

function PenItemContent(props){
  const {html,js,css,title,user_name,random_url,heart_count,comments_count,view_count,setToggle,setData} = props
  const data = {title,user_name,random_url,heart_count,comments_count,view_count,html,js,css}
  function atAlert(e) {
    setToggle(true)
    setData(data)
  }
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
          <img src="./name.svg" alt="" />
        <div className="pen-img">
          <img src="https://fakeimg.pl/350x200/eee" />
          <a className="cover-link" href={`${user_name}/pen/${random_url}`}></a>
          <div className="prompt-link">
            <button id="modal-btn" className="modal-btn" onClick={ atAlert }>
              <i className="fas fa-expand-arrows-alt"></i>
            </button>
          </div>
        </div>

        <footer className="pen-footer">
          <button className="pen-footer-style" data-btn="love" data-url={random_url}>
            <i className="fas fa-heart"></i>
            <span>{heart_count}</span>
          </button>
          <a href="#" className="pen-footer-style" data-btn="comments">
            <i className="fas fa-comment"></i>
            <span>{comments_count}</span>
          </a>
          <a href="#" className="pen-footer-style" data-btn="views">
            <i className="fas fa-eye"></i>
            <span>{view_count}</span>
          </a>
        </footer>
      </div>
  )

}

function PageBtn(props) {
  let { nextBtn,prevBtn,currentPage,allPages } = props
  return(
    <div className="next-prev-btn">
      {/* 判斷 < 16 next-btn 消失; > 1 prev-btn 消失; onClick 呼叫 function */}
      { currentPage > 1 ?
        <button className="prev-btn" onClick={ prevBtn }>
          <span className="arrow-left"><i className="fas fa-chevron-right"></i></span>
          <span>Prev</span>
        </button>: null
      },
      { currentPage < allPages ?
        <button className="next-btn" onClick={ nextBtn }>
          <span>Next</span>
          <i className="fas fa-chevron-right"></i>
        </button>: null
      }
    </div>
  )
}

function GridItem() {
  const [grid, setGrid] = React.useState([]);
  const [allTotalPage, setTotalPage] = React.useState(1);
  const [clickPage, setClickPage] = React.useState(1);
  const [getData, setGetData] = React.useState({});
  const [toggle, setToggle] = React.useState(false);
  console.log(getData);
  console.log(toggle);
  // 附加 Api ; clickPage 有更動重跑 useEffect
  React.useEffect(() =>{
    const a = []
    ax.get(`/api/v1/pens/grid/${clickPage}`)
      .then(res =>{
        setGrid(res.data.payload.pens)
        setTotalPage(res.data.payload.meta.totalPages)
        res.data.payload.pens.forEach ((pen) => {
          a.push(pen.id)
        })
        console.log(a);
      })
      .catch(err =>{
        console.log('err');
      })
  }, [clickPage])
  // showAlert();

  function nextBtn() {
    if (clickPage < allTotalPage) { setClickPage(clickPage + 1) }
  }
  function prevBtn() {
    if (clickPage > 1) { setClickPage(clickPage - 1) }
  }

  // if (toggle === true) {
  //   console.log('yes');
  //   let ass=document.querySelector('.modal-content').textContent
  //   console.log(ass);
  // }
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
                     />
                    {/* setid setToggle  */}
                </article>
              )
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
  )
}

document.addEventListener('turbolinks:load',function(){
  const PenItemsWrap = document.querySelector('.pens-grid');
  if (PenItemsWrap) {
    ReactDOM.render(
      <GridItem />,
      PenItemsWrap
    )
  }
})
