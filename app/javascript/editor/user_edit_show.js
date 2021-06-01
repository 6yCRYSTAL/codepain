import axios from 'axios'

document.addEventListener('turbolinks:load', () => {
  const html = document.querySelector('#editor--html')
  const css = document.querySelector('#editor--css')
  const js = document.querySelector('#editor--js')
  if(html && css && js){
    let updateBtn = document.querySelector('#btn-update')
    let randomurl = location.href.split('/pen/')[1]
    let title = document.querySelector('#edit-title')
    let inputValue = document.querySelector("#input-title")
    let privateLock = document.querySelector('#private-lock')
    let privateSwitch = document.querySelector('#btn-private-switch')

    let editorHTML = ace.edit("editor--html")
    let editorCSS = ace.edit("editor--css")
    let editorJS = ace.edit("editor--js")

    if (randomurl){
      axios({
        method: 'get',
        url: `/api/v1/pens/${randomurl}/edit`
      })
      .then( (response) => {
        let data = response.data
        if(data.status === "ok"){
          title.textContent = data.payload.title
          inputValue.value = data.payload.title
          editorHTML.session.setValue(data.payload.html)
          editorCSS.session.setValue(data.payload.css)
          editorJS.session.setValue(data.payload.js)
          if (privateSwitch) {
            privateSwitch.checked = data.payload.private
            privateLock.classList.remove(data.payload.private ? "hidden" : "")
          }
        }
      })
      .catch( (error) => {
        return `${error.name}: ${error.message}`
      })
    }
  }
})