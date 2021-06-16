import { Controller } from "stimulus"
import Rails from '@rails/ujs'
export default class extends Controller {
  static targets = [
    "editBtn", "cancelBtn", "updateBtn", "commentLi",
    "deleteBtn", "commentBlock", "updateTextArea",
    "commentShow", "warningBlock", "commentsCount", "editBtnBlock"]

  initialize() {
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
    this.editBtnBlockTarget.style.visibility = "hidden"
  }

  update() {
    let newContent = this.updateTextAreaTarget.value
    let comment_id =this.updateBtnTarget.dataset.id
    this.commentShowTarget.textContent = newContent
    let content_upate = () => {
      return `content=${newContent}`
    }

    Rails.ajax({
      url: `/api/v1/comments/${comment_id}`,
      type: 'PATCH',
      data: content_upate()
    })
    this.commentBlockToggle()
    this.editBtnBlockTarget.style.visibility = ""
  }

  cancel() {
    this.commentBlockToggle()
    this.editBtnBlockTarget.style.visibility = ""
  }

  delete() {
    this.warningBlockTarget.classList.toggle("hidden")
  }

  realDelete() {
    let comment_id = this.realDeleteBtnTarget.dataset.id
    let comment_li = this.commentLiTarget
    Rails.ajax({
      url: `/api/v1/comments/${comment_id}`,
      type: 'DELETE',
      success: function(data) {
        if(data.status === "Destroyed") {
          comment_li.remove()
        }
      }
    })
  }

  deleteCancel() {
    this.warningBlockTarget.classList.toggle("hidden")
  }
}
