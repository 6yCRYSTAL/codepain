import Rails from '@rails/ujs'

function sendParamsToRails(method, params) {
  Rails.ajax({
    url: `/api/v1/pens/${params}`,
    type: method,
    dataType: 'json',
    data: params
  })
}

// TODO:測試要改
document.addEventListener('turbolinks:load', () => {
  const restoreOrDelBtn = document.querySelectorAll('#restore-or-del-btn')
  // let userName = editPagePath.split('/')[1]
  let penRestoreParams
  let penDelParams

  restoreOrDelBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.currentTarget.dataset[restore]) {
        penRestoreParams = `pen[id]=${e.currentTarget.dataset[restore]}`
        sendParamsToRails('PUT', penRestoreParams)
      } else {
        penDelParams = `pen[id]=${e.currentTarget.dataset[reallyDeleted]}`
        sendParamsToRails('DELETE', penDelParams)
      }
    })
  })

})