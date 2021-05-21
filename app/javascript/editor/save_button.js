import Rails from '@rails/ujs'
import axios from 'axios'

document.addEventListener('turbolinks:load', () => {
  const saveBtn = document.querySelector('#btn-save');
  const editBtn = document.querySelector('#btn-edit');
  const input = document.querySelector('#inputTitle');
  const title = document.querySelector('#edit-title');
  let randomURL = location.href.split('/pen/')[1];
  let inputValue = '';
  let ax = axios.create();
  let token = document.querySelector('meta[name=csrf-token]').content;
  ax.defaults.headers.common['X-CSRF-Token'] = token;


  // edit 編輯和存取
  if (editBtn && saveBtn){

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
      putData();
    }
    let putData = function() {
      let newTitle = inputValue;
      let username = document.querySelector('#username').textContent;
      ax.patch(`/api/v1/pens/${randomURL}`,
        {
          pen: { title: newTitle }
        }
      )
    }
    saveBtn.addEventListener('click', () => {
      let newTitle = inputValue;
      let username = document.querySelector('#username').textContent
      let html = ace.edit("editor--html")
      let css = ace.edit("editor--css")
      let js = ace.edit("editor--js")
      let htmlValue = html.session.getValue()
      let cssValue = css.session.getValue()
      let jsValue = js.session.getValue()
      let paramsFromNewPen = () => {
        return `user[username]=${username}&pen[title]=${newTitle}&pen[html]=${htmlValue}&pen[css]=${cssValue}&pen[js]=${jsValue}`
      }
      Rails.ajax({
        url: '/api/v1/pens',
        type: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        dataType: 'json',
        data: paramsFromNewPen()
      })
    })
  }
})