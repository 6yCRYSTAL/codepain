import Rails from '@rails/ujs'

document.addEventListener('turbolinks:load', () => {
  let saveBtn = document.querySelector('#save-btn')
  let title = document.querySelector('#title').textContent
  let userName = document.querySelector('#user-name').textContent
  let html = document.querySelector('#user-input-html').textContent
  let css = document.querySelector('#user-input-css').textContent
  let js = document.querySelector('#user-input-js').textContent

  saveBtn.addEventListener('click', () => {
    Rails.ajax({
      url: `/pen`,
      type: 'POST',
      data: {
        'title': title,
        'html': html,
        'css': css,
        'js': js
      },
      success: reponse => {
        console.log('yeahaha')
      },
      error: err => {
        console.log('shit')
      }
    })

  })
})