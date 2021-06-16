import Rails from '@rails/ujs'

function getSavePrivateBtn() {
  const savePrivateBtn = document.querySelector('#btn-save-as-private');
  if (savePrivateBtn){
    savePrivateBtn.addEventListener('click', () => {
      let cssCDN = localStorage.getItem('css')
      let jsCDN = localStorage.getItem('js')
      let newTitle = document.querySelector('#edit-title').textContent;
      let username = document.querySelector('#username').textContent;
      let html = ace.edit("editor--html")
      let css = ace.edit("editor--css")
      let js = ace.edit("editor--js")
      let htmlValue = encodeURIComponent(html.session.getValue())
      let cssValue = encodeURIComponent(css.session.getValue())
      let jsValue = encodeURIComponent(js.session.getValue())
      let paramsFromNewPen = `user[username]=${username}&pen[title]=${newTitle}&pen[html]=${htmlValue}&pen[css]=${cssValue}&pen[js]=${jsValue}&resource[css]=${cssCDN}&resource[js]=${jsCDN}&pen[private]=true`

      Rails.ajax({
        url: '/api/v1/pens',
        type: 'post',
        data: paramsFromNewPen
      })
    })
  }
}
export default getSavePrivateBtn;