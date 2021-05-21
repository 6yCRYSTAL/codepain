import Rails from '@rails/ujs'

document.addEventListener('turbolinks:load', () => {
  const saveBtn = document.querySelector('#btn-save');
  const editBtn = document.querySelector('#btn-edit');
  const input = document.querySelector('#inputTitle');
  const title = document.querySelector('#edit-title');

  // edit 編輯和存取
  if (editBtn && saveBtn){
    editBtn.addEventListener('click', () => {
      title.textContent= '';
      title.style.display="none";
      input.style.display="inline";
      editBtn.style.display="none";
      input.focus();
    })

    let allEvent = 0; // TODO:要加註解或改變數名
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
      let inputValue = e.target.value;
      // TODO: 要fixed
      titleNew = title.textContent = inputValue;
    }

    saveBtn.addEventListener('click', () => {
      let titleNew = document.querySelector('#edit-title').textContent
      let username = document.querySelector('#username').textContent
      let html = ace.edit("editor--html")
      let css = ace.edit("editor--css")
      let js = ace.edit("editor--js")
      let htmlValue = html.session.getValue()
      let cssValue = css.session.getValue()
      let jsValue = js.session.getValue()
      let paramsFromNewPen = () => {
        return `user[username]=${username}&pen[title]=${titleNew}&pen[html]=${htmlValue}&pen[css]=${cssValue}&pen[js]=${jsValue}`
      }
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