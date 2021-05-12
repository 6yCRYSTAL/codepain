import Rails from '@rails/ujs'


document.addEventListener('turbolinks:load', () => {
  // const saveBtn = document.querySelector('#save-btn')

// TODO:測試要改

  let title = document.querySelector('#title').textContent
  let html = document.querySelector('#user-input-html').textContent
  let css = document.querySelector('#user-input-css').textContent
  let js = document.querySelector('#user-input-js').textContent
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