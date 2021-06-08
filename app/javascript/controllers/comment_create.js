
import { Controller } from "stimulus"
import Rails from '@rails/ujs'
import moment from 'moment';
export default class extends Controller {
  static targets = [ "createBtn", "createTextArea", "list" ]

  initialize() {
    this.comment_id = ''
  }

  create() {
    let content = this.createTextAreaTarget.value
    let randomurl = location.href.split('/').reverse()[0]
    let list = this.listTarget
    let listElement = document.createElement('li')
    listElement.setAttribute("data-controller", "comupdate")
    this.createTextAreaTarget.value = ''

    Rails.ajax({
      url: `/api/v1/comments`,
      type: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      dataType: 'json',
      data: `content=${content}&random_url=${randomurl}`,
      // 取回後端資料渲染
      success: function(data) {
        listElement.innerHTML = `
        <div>
          <span>${data.user.display_name} (@${data.user.username})</span>
          <span>${moment(data.created_at).fromNow()} ago</span>
        </div>
        <div class="comment-edit-block" data-comupdate-target="commentBlock">
          <textarea data-comupdate-target="updateTextArea">${data.content}</textarea>
          <button
            data-action="click->comupdate#update"
            data-comupdate-target="updateBtn"
          > Update </button>
          <button
            data-action="click->comupdate#cancel"
            data-comupdate-target="cancelBtn"
          > Cancel </button>
        </div>
        <div>
          <p data-comupdate-target="commentShow">${data.content}</p>
        </div>
        <button
          data-action="click->comupdate#edit"
          data-comupdate-target="editBtn"
          data-id=${data.id}
        > Edit </button>
        <button
          data-action="click->comupdate#destroy"
          data-comupdate-target="deleteBtn"
        > Delete
        </button>
        `
        list.insertAdjacentElement('afterbegin', listElement)
      }
    })

  }
}