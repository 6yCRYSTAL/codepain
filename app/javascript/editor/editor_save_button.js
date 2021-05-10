import Rails from '@rails/ujs'

document.addEventListener('turbolinks:load', () => {
  let saveBtn = document.querySelector('#save-btn')
  let userName = document.querySelector('#user-name')

  saveBtn.addEventListener('click', () => {
    Rails.ajax({
      url: `/${userName}/pen/${亂數URL}`
    })

  })
})