import Rails from '@rails/ujs'

document.addEventListener('turbolinks:load', () => {
  const subBtn = document.querySelector('#subBtn')
  const period = subBtn.dataset.period
  const plan = subBtn.dataset.plan
  const orderParams = `product[period]=${period}&product[plan]=${plan}`
  console.log('sss');
  subBtn.addEventListener('click', () => {
    console.log(orderParams);
    Rails.ajax({
      url: '/api/v1/orders',
      type: 'POST',
      dataType: 'json',
      data: orderParams
    })
  })
})