import Rails from '@rails/ujs'

function sendParamsToRails(method, params) {
  Rails.ajax({
    url: `/api/v1/deleted_pens/${params}`,
    type: method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    dataType: 'json',
    data: params
  })
}

document.addEventListener('turbolinks:load', () => {
  const restoreOrDelBtn = document.querySelectorAll('#restore-or-del-btn')

  restoreOrDelBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.currentTarget.dataset['undo']) {
        let penUndoParams = `pen[id]=${e.currentTarget.dataset['undo']}`
        sendParamsToRails('PUT', `${e.currentTarget.dataset['undo']}`)

      } else {
        let penDelParams = `pen[id]=${e.currentTarget.dataset['foreverDelete']}`
        sendParamsToRails('DELETE', `${e.currentTarget.dataset['foreverDelete']}`)
      }
    })
  })
})