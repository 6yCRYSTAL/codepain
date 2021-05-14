import Rails from '@rails/ujs'


document.addEventListener('turbolinks:load', () => {
  const delBtn = document.querySelector('#delete-btn')

// TODO:測試要改
  let editPagePath = window.location.pathname
  // let userName = editPagePath.split('/')[1]
  let randomURL = editPagePath.split('/').pop()

  // let penDelParams = `user[username]=${userName}&pen[random_url]=${randomURL}`
  let penDelParams = `pen[random_url]=${randomURL}`

  delBtn.addEventListener('click', () => {
    Rails.ajax({
      url: editPagePath,
      type: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      dataType: 'json',
      data: penDelParams
    })
  })
})