import axios from 'axios'
import getSaveBtn from './save_button.js'

document.addEventListener('turbolinks:load', () => {
  const editBtn = document.querySelector('#btn-edit');
  const input = document.querySelector('#inputTitle');
  const title = document.querySelector('#edit-title');
  let randomURL = location.href.split('/pen/')[1];
  let LastTwoURL = location.href.split('/').slice(-2)
  let inputValue = '';
  let ax = axios.create();
  let token = document.querySelector('meta[name=csrf-token]').content;
  ax.defaults.headers.common['X-CSRF-Token'] = token;

  // edit 編輯和存取
  if (editBtn){
    editBtn.addEventListener('click', () => {
      title.style.display="none";
      input.style.display="inline";
      editBtn.style.display="none";
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
      editBtn.style.display="inline";
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
      ax.patch(`/api/v1/pens/${randomURL}`,{ pen: { title: newTitle }})
      .then(res =>{
        console.log(res.data.status);
      }).catch(error => { 
        // console.log(error.status) 
        console.log('error');
      })
    }
  }
})