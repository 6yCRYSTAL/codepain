import axios from 'axios'
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;

document.addEventListener('turbolinks:load',function(){
  const penGrid = document.querySelector('.pen-items-wrap')
  if(penGrid){
    firstLoaded();
  }
})
function axiosData() {
  let getData= ax.get("/api/v1/pens")
  .then(res =>{
    return res.data
  })
  return getData
}
async function firstLoaded() {
  let penData = await axiosData();
  let penDataCount = penData.slice(0, 6);
  renderView(penDataCount);
  getLike();
}
function renderView(pen) {
  const itemsWrap = document.querySelector('.pen-items-wrap');
  let result = '';
  pen.forEach((pen) => {
    result +=`
      <article class="col">
        <div class="pen-item">
          <header class="pen-header">
            <h2>${pen.title}</h2>
            <button class="pen-more">
              <svg viewBox="0 0 29 7" title="more">
                <circle cx="3.5" cy="3.5" r="3.5"></circle>
                <circle cx="14.5" cy="3.5" r="3.5"></circle>
                <circle cx="25.5" cy="3.5" r="3.5"></circle>
              </svg>
            </button>
          </header>
          <div class="pen-img">
              <img src="https://fakeimg.pl/350x200/eee">
              <a class="cover-link" href="${pen.user_id}/pen/${pen.random_url}"></a>
              <a class="prompt-link" href="https://stackoverflow.com/">
                <button>
                  <i class="fas fa-expand-arrows-alt"></i>
                </button>
              </a>
          </div>
          <footer class="pen-footer">
            <button class="pen-footer-style" data-btn="love" data-url="${pen.random_url}">
              <i class="fas fa-heart"></i>
              <span>0</span>
            </button>
            <a href="#" class="pen-footer-style" data-btn="comments">
              <i class="fas fa-comment"></i>
              <span>${pen.comments_count}</span>
            </a>
            <a href="#" class="pen-footer-style" data-btn="views">
              <i class="fas fa-eye"></i>
              <span>${pen.edit_view_count}</span>
            </a>
          </footer>
        </div>
      </article>
    `
  });
  itemsWrap.innerHTML = result;

}
let getLike = ()=>{
  const loveBtn = document.querySelectorAll('[data-btn="love"]')
  loveBtn.forEach( btn => {
    btn.addEventListener('click',(e)=>{
      console.log(btn);
      let randomUrl = e.currentTarget.dataset.url;
      console.log(randomUrl);
      likeStatus(randomUrl);
    })
  });
}

function likeStatus(url) {
  const cc = document.querySelector(`[data-url="${url}"]`)
  if(cc){
  ax.post(`/api/v1/pens/${url}/love`)
  .then(response => {
    // console.log(response.data.status);
    if(response.data.status === "added"){
      console.log('yes');
      document.querySelector(`[data-url="${url}"] .fa-heart`).style.color = 'red';
    }else{
      console.log('no');
      document.querySelector(`[data-url="${url}"] .fa-heart`).style.color = 'white';
    }
  })
  .catch(error => {
    console.log('qwoijqodwijqoidw')
  })
  }
}