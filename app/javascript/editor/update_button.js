import Rails from '@rails/ujs'
// import axios from 'axios'

document.addEventListener('turbolinks:load', () => {
  let updateBtn = document.querySelector('#btn-update')

  if(updateBtn){
    let title = document.querySelector('#edit-title')
    let username = document.querySelector('#username').textContent
    let html = ace.edit("editor--html")
    let css = ace.edit("editor--css")
    let js = ace.edit("editor--js")
  
    updateBtn.addEventListener('click', () => {
      let titleNew = title.textContent
      let htmlValue = html.session.getValue()
      let cssValue = css.session.getValue()
      let jsValue = js.session.getValue()
      let randomurl = location.href.split('/pen/')[1]
      let paramsFromNewPen = () => {
        return `user[username]=${username}&pen[title]=${titleNew}&pen[html]=${htmlValue}&pen[css]=${cssValue}&pen[js]=${jsValue}`
      }
      Rails.ajax({
        url: `/api/v1/pens/${randomurl}`,
        type: 'PATCH',
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