import { Controller } from "stimulus"
import Rails from '@rails/ujs'
export default class extends Controller {
  static targets = [ "createBtn", "createTextArea", "list", "commentsCount" ]
  static values = { url: String, commentsCount: Number }
  initialize() {
    this.comments_count = this.commentsCountValue
  }

  // 偵測 ol 子元素變化，更新顯示評論數
  connect() {
    let commentCountP = this.commentsCountTarget
    let targetNode = document.querySelector(`#${this.urlValue}`);
    let config = { attributes: true, childList: true };
    let callback = (mutationsList) => {
          for(let mutation of mutationsList) {
            if (mutation.addedNodes.length === 1){
              if (this.comments_count === 0) {
                this.comments_count += 1
                commentCountP.innerHTML = `${this.comments_count} comment`
              } else {
                this.comments_count += 1
                commentCountP.innerText = `${this.comments_count} comments`
              }
            }if (mutation.removedNodes.length === 1){
              if (this.comments_count === 2) {
                this.comments_count -= 1
                commentCountP.innerText = `${this.comments_count} comment`
              } else if (this.comments_count === 1) {
                this.comments_count -= 1
                commentCountP.innerHTML =`
                  <strong>No Comments</strong>
                  <br>
                  You can be the first!
                `
              } else {
                this.comments_count -= 1
                commentCountP.innerText = `${this.comments_count} comments`
              }
            }
          }
        }
    let observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }

  create() {
    let content = this.createTextAreaTarget.value
    let randomurl = this.urlValue.substring(1)
    let listElement = document.createElement('li')
    listElement.setAttribute("data-controller", "comment-update comment-delete")
    listElement.setAttribute("data-comment-update-target", "commentLi")
    listElement.setAttribute("data-comment-delete-target", "commentLi")
    this.createTextAreaTarget.value = ''
    Rails.ajax({
      url: `/api/v1/comments`,
      type: 'POST',
      data: `content=${content}&random_url=${randomurl}`,
      // 取回後端資料渲染
      success: (data) => {
        listElement.innerHTML = `
        <div class = "comment-user-info">
          <div class="user-comment-img">
            <img src="/images/user-img.jpg" alt="使用者圖像" />
          </div>
          <div class="user-name" >
            <span>${data.user.display_name}</span>
            <span class="light-text"> (@${data.user.username})</span>
          </div>
          <div class="comment-time">
            <span> less than a minute ago </span>
          </div>
        </div>
        <div class="comment-update-block"
          data-comment-update-target="commentBlock">
          <textarea data-comment-update-target="updateTextArea">${data.content}</textarea>
          <div class="update-btn-block">
            <button
            data-action="click->comment-update#cancel"
            data-comment-update-target="cancelBtn"
            > Cancel </button>
            <button
              data-action="click->comment-update#update"
              data-comment-update-target="updateBtn"
              data-id="${data.id}"
            > Update </button>
          </div>
        </div>
        <div class="comment-content-block">
          <div class="comment-content-text">
            <p data-comment-update-target="commentShow">${data.content}</p>
          </div>
          <div class="edit-btn-block">
            <button
              class='comment-edit-btn'
              data-action='click->comment-update#edit'
              data-comment-update-target='editBtn'>
              <span><i class='fas fa-pencil-alt'></i></span>
              <span>Edit</span>
            </button>
            <button
              class='comment-delete-btn'
              data-action='click->comment-delete#delete'
              data-comment-update-target='deleteBtn'>
              <span><i class='fas fa-trash'></i></span>
              <sapn>Delete</sapn>
            </button>
          </div>
        </div>
        `
        listElement.setAttribute("data-comment-delete-id-value", data.id)
        this.listTarget.insertAdjacentElement('afterbegin', listElement)
      }
    })
  }
}
