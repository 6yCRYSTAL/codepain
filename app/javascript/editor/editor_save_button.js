import axios from 'axios'
import Rails from '@rails/ujs'

document.addEventListener('turbolinks:load', () => {
  const saveBtn = document.querySelector('#btn-save')
  const editBtn = document.querySelector('#btn');
  // let ax = axios.create()
  // let token = document.querySelector('meta[name=csrf-token]').content
  // ax.defaults.headers.common['X-CSRF-Token'] = token

  // edit 儲存資料與編輯文字
  if (editBtn && saveBtn){
    const input = document.querySelector('#inputTitle');
    const title = document.querySelector('#edit-title');
    editBtn.addEventListener('click', () => {
      title.textContent= '';
      title.style.display="none";
      input.style.display="inline";
      editBtn.style.display="none";
      input.focus();
    })
    let allEvent = 0;
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
    let eventContent = (e)=>{
      let inputValue = e.target.value;
      title.style.display="inline";
      input.style.display="none";
      editBtn.style.display="inline";
      title.textContent= inputValue;
      titleNew = title.textContent;

      // ax.post('/api/v1/pens',data)
      //   .then(response => {
      //     console.log(response)
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
      // var data = {
      //   title: titleNew
      // }

    }
  
    
    let titleNew = document.querySelector('#edit-title').textContent
    let username = document.querySelector('#username').textContent
    let html = ace.edit("editor--html")
    let css = ace.edit("editor--css")
    let js = ace.edit("editor--js")
    let htmlValue
    let cssValue
    let jsValue
    let paramsFromNewPen = () => {
      return `user[username]=${username}&pen[title]=${titleNew}&pen[html]=${htmlValue}&pen[css]=${cssValue}&pen[js]=${jsValue}`
    }

    html.getSession().on('change',function(){
      htmlValue = html.session.getValue()
    })

    css.getSession().on('change',function(){
      cssValue = css.session.getValue()
    })

    js.getSession().on('change',function(){
      jsValue = js.session.getValue()
    })

    saveBtn.addEventListener('click', () => {
      Rails.ajax({
        url: '/api/v1/pens',
        type: 'POST',
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