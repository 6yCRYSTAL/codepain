import axios from 'axios'
let ax = axios.create();
let token = document.querySelector('meta[name=csrf-token]').content;
ax.defaults.headers.common['X-CSRF-Token'] = token;

// 按下取的愛心
export default function getLike(e) {
  let randomUrl = e.currentTarget.dataset.url;
  likeStatus(randomUrl);
  function likeStatus(url) {
    let likeIcon= document.querySelector(`[data-url="${url}"] .fa-heart`)
    let likeSpan= document.querySelector(`[data-url="${url}"] span`);
    // 愛心樣式與數字
    ax.post(`/api/v1/pens/${url}/love`)
    .then(response => {
      if(response.data.status === "added"){
        likeIcon.style.color = 'red';
        let likeSpanContent = likeSpan.textContent;
        let likeCount = parseInt(likeSpanContent);
        likeCount += 1;
        likeSpan.textContent = likeCount;
      }else{
        likeIcon.style.color = 'white';
        let likeSpanContent = likeSpan.textContent;
        let likeCount = parseInt(likeSpanContent);
        likeCount -= 1;
        likeSpan.textContent = likeCount;
      };
    });
  };
};