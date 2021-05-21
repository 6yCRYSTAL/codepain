import Rails from '@rails/ujs'

document.addEventListener('turbolinks:load', () => {
  const subBtn = document.querySelector('#subBtn')
  const period = subBtn.dataset.period
  const plan = subBtn.dataset.plan
  const orderParams = `product[period]=${period}&product[plan]=${plan}`

  subBtn.addEventListener('click', () => {
    Rails.ajax({
      url: '/api/v1/orders',
      type: 'POST',
      dataType: 'json',
      data: orderParams
    })
  })
})