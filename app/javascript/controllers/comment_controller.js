import { Controller } from "stimulus"
import Rails from '@rails/ujs'
export default class extends Controller {

  static targets = ["createBtn", "editBtn", "cancelBtn", "commentBlock", "updateTextArea","createTextArea", "commentShow", "updateBtn"]

  initialize() {
    this.comment_id = ''
  }

  create() {
    let content = this.createTextAreaTarget.value
    let randomurl = location.href.split('/').reverse()[0]
    Rails.ajax({
      url: `/api/v1/comments`,
      type: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      dataType: 'json',
      data: `content=${content}&random_url=${randomurl}`
    })
    // 取回後端資料渲染
  }

  edit() {
    this.commentBlockTarget.classList.add("appear")
    this.updateTextAreaTarget.value = this.commentShowTarget.textContent
    this.comment_id = this.editBtnTarget.dataset.id
  }

  update() {
    let newContent = this.updateTextAreaTarget.value
    this.commentShowTarget.textContent = newContent
    let content_upate = () => {
      return `content=${newContent}`
    }

    Rails.ajax({
      url: `/api/v1/comments/${this.comment_id}`,
      type: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      dataType: 'json',
      data: content_upate()
    })

    this.commentBlockTarget.classList.remove("appear")
  }

  cancel() {
    this.commentBlockTarget.classList.remove("appear")
  }

}
