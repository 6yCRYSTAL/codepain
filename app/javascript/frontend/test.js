import Rails from '@rails/ujs'


document.addEventListener('turbolinks:load', () => {
  const test = document.querySelector('.test')


  if (test) {
    test.addEventListener('click', () => {
      Rails.ajax({
        url: '/api/v1/pens',
        type: 'GET',
        dataType: 'json'
      })
    })
  }
})