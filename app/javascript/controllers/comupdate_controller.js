import { Controller } from "stimulus"
import Rails from '@rails/ujs'
export default class extends Controller {
  static targets = [
    "editBtn", "cancelBtn", "updateBtn", "deleteBtn",
    "commentBlock", "updateTextArea", "commentShow"]

  initialize() {
    this.comment_id = ''
    this.commentBlockToggle = () => {
      this.commentBlockTarget.classList.toggle("appear")
      this.editBtnTarget.classList.toggle("hidden")
      this.commentShowTarget.classList.toggle("hidden")
      this.deleteBtnTarget.classList.toggle("hidden")
    }
  }

  edit() {
    this.commentBlockToggle()
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
    this.commentBlockToggle()
  }

  cancel() {
    this.commentBlockToggle()
  }
}
