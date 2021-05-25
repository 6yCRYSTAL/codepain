import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;

function PenItemContent(props){
  return(
    <article className="col">
      <div className="pen-item">
        <header className="pen-header">
          <h2>{props.title}</h2>
          <button className="pen-more">
          <svg viewBox="0 0 29 7" title="more">
          <circle cx="3.5" cy="3.5" r="3.5"></circle>
          <circle cx="14.5" cy="3.5" r="3.5"></circle>
          <circle cx="25.5" cy="3.5" r="3.5"></circle>
          </svg>
          </button>
        </header>

        <div className="pen-img">
          <img src="https://fakeimg.pl/350x200/eee" />
          <a className="cover-link" href="https://github.com/"></a>
          <a className="prompt-link" href="https://stackoverflow.com/">
            <button>
              <i className="fas fa-expand-arrows-alt"></i>
            </button>
          </a>
        </div>

        <footer className="pen-footer">
          <button className="pen-footer-style" data-btn="love">
            <i className="fas fa-heart"></i>
            <span>0</span>
          </button>
          <a href="#" className="pen-footer-style" data-btn="comments">
            <i className="fas fa-comment"></i>
            <span>0</span>
          </a>
          <a href="#" className="pen-footer-style" data-btn="views">
            <i className="fas fa-eye"></i>
            <span>0</span>
          </a>
        </footer>
      </div>
    </article>
  )
}

function GridItem() {
  const [Grid, setGrid] = React.useState([]);
  React.useEffect(() =>{
    ax.get("/api/v1/pens")
      .then(res =>{
        setGrid(res.data.payload)
      })
  }, [])

  return(
    <div className="pen-items-wrap">
        {
          Grid.map((data) =>{
            return(
              <article class="col">
                <PenItemContent
                  title={data.title}
                />
              </article>
            )
          })
        }
    </div>
  )
}

document.addEventListener('turbolinks:load',function(){
  const PenItemsWrap = document.querySelector('.app');
  if (PenItemsWrap) {
    ReactDOM.render(
      <GridItem />,
      PenItemsWrap
    )
  }
})
