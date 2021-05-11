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
      dataType: 'json',
      data: {
        // params: {
          title: 'TTT',
          html: 'HHH'
        // }
      },
      success: response => {
        console.log('response')
      },
      error: err => {
        console.log('shit')
      }
    })

  })
})