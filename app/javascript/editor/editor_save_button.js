import Rails from '@rails/ujs'
import "./new"

document.addEventListener('turbolinks:load', () => {
  const saveBtn = document.querySelector('#save-btn')

  let title = document.querySelector('#edit-title').textContent
  let html = ace.edit("editor--html").session.getValue()
  let css = ace.edit("editor--css").session.getValue()
  let js = ace.edit("editor--js").session.getValue()
  let penParams = `pen[title]=${title}&pen[html]=${html}&pen[css]=${css}&pen[js]=${js}`

  saveBtn.addEventListener('click', () => {
    Rails.ajax({
      url: '/api/v1/pens',
      type: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      dataType: 'json',
      data: penParams
    })
  })
})