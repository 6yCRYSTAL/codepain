import { Controller } from "stimulus"
import Rails from '@rails/ujs'
export default class extends Controller {
  static targets = ["createBtn", "createTextArea", "list", "commentsCount"]

  initialize() {
    this.comments_count = parseInt(this.commentsCountTarget.dataset.commentsCount)
  }
  // 偵測 ol 子元素變化，更新顯示評論數
  connect() {
    let commentCountP = this.commentsCountTarget
    let comments_count = this.comments_count
    let targetNode = document.querySelector('#comment-list');
    let config = { attributes: true, childList: true };
    let callback = function(mutationsList) {
          for(let mutation of mutationsList) {
            if (mutation.addedNodes.length === 1){
              if (comments_count === 0) {
                comments_count += 1
                commentCountP.innerText = `${comments_count} comment`
              } else {
                comments_count += 1
                commentCountP.innerText = `${comments_count} comments`
              }
            }if (mutation.removedNodes.length === 1){
              if (comments_count === 2) {
                comments_count -= 1
                commentCountP.innerText = `${comments_count} comment`
              } else if (comments_count === 1) {
                comments_count -= 1
                commentCountP.innerHTML =`
                <p>
                  <strong>No Comments</strong>
                  <br>
                  You can be the first!
                </p>`
              } else {
                comments_count -= 1
                commentCountP.innerText = `${comments_count} comments`
              }
            }
          }
        }
    let observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }

  create() {
    let content = this.createTextAreaTarget.value
    let randomurl = location.href.split('/').reverse()[0]
    let listElement = document.createElement('li')
    listElement.setAttribute("data-controller", "comment-update comment-delete")
    listElement.setAttribute("data-comment-update-target", "commentLi")
    listElement.setAttribute("data-comment-delete-target", "commentLi")
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
      success: (data) => {
        listElement.innerHTML = `
        <div>
          <span>${data.user.display_name} (@${data.user.username})</span>
          <span> less than a minute ago </span>
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
          data-action="click->comment-delete#delete"
          data-comment-update-target="deleteBtn"
        > Delete</button>
        `
        listElement.setAttribute("data-comment-delete-id-value", data.id)
        this.listTarget.insertAdjacentElement('afterbegin', listElement)
      }
    })
  }
}
