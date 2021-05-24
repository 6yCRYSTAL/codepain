import axios from 'axios'

document.addEventListener('turbolinks:load', () => {
  let updateBtn = document.querySelector('#btn-update')
  let randomurl = location.href.split('/pen/')[1]
  let title = document.querySelector('#edit-title')
  let inputValue =document.getElementById("input-title")

  let editorHTML = ace.edit("editor--html")
  let editorCSS = ace.edit("editor--css")
  let editorJS = ace.edit("editor--js")

  if (updateBtn){
    axios({
      method: 'get',
      url: `/api/v1/pens/${randomurl}/edit`
    })
    .then( (response) => {
        let data = response.data.payload
        title.textContent = data.title
        inputValue.value= data.title
        editorHTML.session.setValue(data.html)
        editorCSS.session.setValue(data.css)
        editorJS.session.setValue(data.js)
      })
      .catch( (error) => {
        return `${error.name}: ${error.message}`
      })
  }
})