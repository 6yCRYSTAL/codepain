// import Rails from '@rails/ujs'
import axios from 'axios'
import { init } from './new.js'

document.addEventListener('turbolinks:load', () => {
  let updateBtn = document.querySelector('#btn-update')
  let randomurl = location.href.split('/pen/')[1]
  let title = document.querySelector('#edit-title')
  let html = document.querySelector('#editor--html')
  let css = document.querySelector('#editor--css')
  let js = document.querySelector('#editor--js')

  if (updateBtn){
    axios({
      method: 'get',
      url: `/api/v1/pens/${randomurl}/edit`
    })
    .then( (response) => {
        let data = response.data
        console.log(data);
        title.textContent = data.title
        html.innerText = data.html
        css.innerText = data.css
        js.textContent = data.js
      })
      .catch( (error) => {
        return `${error.name}: ${error.message}`
      })
  }


})