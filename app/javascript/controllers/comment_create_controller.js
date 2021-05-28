import { Controller } from "stimulus"
import Rails from '@rails/ujs'
import moment from 'moment';
export default class extends Controller {
  static targets = ["createBtn", "createTextArea", "list", "commentsCount"]

  initialize() {
    this.comment_id = '',
    this.comments_count = parseInt(this.commentsCountTarget.dataset.commentsCount)
  }

  create() {
    let content = this.createTextAreaTarget.value
    let randomurl = location.href.split('/').reverse()[0]
    let list = this.listTarget
    let listElement = document.createElement('li')
    listElement.setAttribute("data-controller", "comment-update")
    listElement.setAttribute("data-comment-update-target", "commentLi")
    this.createTextAreaTarget.value = ''
    let commentCountP = this.commentsCountTarget
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
        <div class="comment-edit-block"
          data-comment-update-target="commentBlock">
          <textarea data-comment-update-target="updateTextArea">${data.content}</textarea>
          <button
            data-action="click->comment-update#update"
            data-comment-update-target="updateBtn"
            data-id="${data.id}"
          > Update </button>
          <button
            data-action="click->comment-update#cancel"
            data-comment-update-target="cancelBtn"
          > Cancel </button>
        </div>
        <div>
          <p data-comment-update-target="commentShow">${data.content}</p>
        </div>
        <button
          data-action="click->comment-update#edit"
          data-comment-update-target="editBtn"
        > Edit </button>
        <button
          data-action="click->comment-update#delete"
          data-comment-update-target="deleteBtn"
        > Delete</button>
        <div class="warning-wrap hidden border-solid border-4" data-comment-update-target="warningBlock">
          <div class="warning-content">
            <h2>Delete Confirmation</h2>
            <p>This will permanently delete this Comment.</p>
            <button
              data-action="click->comment-update#realDelete"
              data-comment-update-target="realDeleteBtn"
              data-id="${data.id}"
            > I understand, delete the Comment</button>
            <button
              data-action="click->comment-update#deleteCancel"
              data-comment-update-target="deleteCancelBtn"
            >Cancel</button>
          </div>
        </div>
        `
        list.insertAdjacentElement('afterbegin', listElement)
      }
    })
    if (this.comments_count === 0) {
      this.comments_count += 1
      commentCountP.innerText = `${this.comments_count} comment`
    } else {
      this.comments_count += 1
      commentCountP.innerText = `${this.comments_count} comments`
    }
  }
}
