import axios from 'axios'
import getSaveBtn from './save_button.js'

document.addEventListener('turbolinks:load', () => {
  const editTitleBtn = document.querySelector('#btn-edit-title');
  const input = document.querySelector('#input-title');
  const title = document.querySelector('#edit-title');
  let randomURL = location.href.split('/pen/')[1];
  let LastTwoURL = location.href.split('/').slice(-2)
  let inputValue = '';
  let ax = axios.create();
  let token = document.querySelector('meta[name=csrf-token]').content;
  ax.defaults.headers.common['X-CSRF-Token'] = token;

  // edit 編輯和存取
  if (editTitleBtn){
    editTitleBtn.addEventListener('click', () => {
      title.style.display="none";
      input.style.display="inline";
      editTitleBtn.style.display="none";
      input.focus();
    })

    let allEvent = 0; // allEvent 兩件事件指觸發一件
    input.addEventListener('keyup', (e) => {
      allEvent =  allEvent + 1;
      if(e.keyCode === 13 && (allEvent !== 3)){
        eventContent(e);
      }else{
        allEvent = 0;
      }
    })

    input.addEventListener('blur', (e) => {
      allEvent = allEvent + 2;
      if(allEvent !== 3){
        eventContent(e);
      }else{
        allEvent = 0;
      }
    })
    // 事件後執行內容
    let eventContent = (e) => {
      title.style.display="inline";
      input.style.display="none";
      editTitleBtn.style.display="inline";
      inputValue = e.target.value;
      title.textContent = inputValue;
      if (input.value === ""){
        title.textContent= "Untitle";
      }else{
        title.textContent= inputValue;
      }
      getSaveBtn(inputValue);
      if(LastTwoURL .join('/') === `pen/${randomURL}`){
        dataPatch();
      }
    }
    // Patch api 
    let dataPatch = function() {
      let newTitle = inputValue;
      let editHeader = document.querySelector('.edit-header');
      ax.patch(`/api/v1/pens/${randomURL}`,{ pen: { title: newTitle }})
      .then(res =>{
        console.log(res.data.status);
        // if(res.data.status === 'update succeeded'){
        //   let noticeDivEl = document.createElement('div');
        //   let noticeTextEl = document.createElement('span');
        //   noticeDivEl.classList.add('edit-title-alert');
        //   noticeTextEl.textContent = 'Pen saved';
        //   noticeDivEl.appendChild(noticeTextEl)
        //   editHeader.insertAdjacentElement('beforebegin', noticeDivEl);
        //   // 1秒後消失
        //   setTimeout(() => {
        //     noticeDivEl.remove();
        //   }, 1000); 
        // }
      })
    }
  }
})