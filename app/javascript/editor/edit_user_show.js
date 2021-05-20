// import Rails from '@rails/ujs'
import axios from 'axios'

document.addEventListener('turbolinks:load', () => {
  const randomurl = location.href.split('/pen/')[1]
  const username = document.querySelector('#username').textContent
  const html = document.querySelector('#editor--html')
  const css = document.querySelector('#editor--css')
  const js = document.querySelector('#editor--js')
  // axios({
  //   method: 'get',
  //   url: `${randomurl}`,
  // })
  // .then( (response) => {
  //   console.log(response)
  //   // data = response.data
  // })
  // .catch( (error) => {
  //   console.log(error)
  // })
  // title = data.title
  //  html.textContent = data.html
  //  css.textContent = data.css
  //  js.textContent = data.js

  axios({
    method: 'get',
    url: 'api/v1/pens'
  })
  .then( (response) => {
      // console.log(response)
      let data = response.data
      console.log(data);
    })
    .catch( (error) => {
      console.log(error)
    })
})