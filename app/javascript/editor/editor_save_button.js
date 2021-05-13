import Rails from '@rails/ujs'

document.addEventListener('turbolinks:load', () => {
  const saveBtn = document.querySelector('#save-btn')

  let title = document.querySelector('#edit-title').textContent
  let username = document.querySelector('#user-name').textContent
  let html = ace.edit("editor--html")
  let css = ace.edit("editor--css")
  let js = ace.edit("editor--js")
  let htmlValue
  let cssValue
  let jsValue
  let paramsFromNewPen = () => {
    return `user[username]=${username}&pen[title]=${title}&pen[html]=${htmlValue}&pen[css]=${cssValue}&pen[js]=${jsValue}`
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
})