import { Controller } from "stimulus"
 import Rails from '@rails/ujs'
export default class extends Controller {

  connect() {
  }

  static targets = [ "editBtn", "cancelBtn", "commentBlock", "textarea", "commentShow", "updateBtn"]

  initialize() {
    this.comment_id = ''
  }

  edit() {
    this.commentBlockTarget.classList.add("appear")
    this.textareaTarget.value = this.commentShowTarget.textContent
    this.comment_id = parseInt(this.data.get("id"))
    this.comment_id = this.editBtnTarget.dataset["id"]
  }

  update() {
    let newContent = this.textareaTarget.value
    console.log(newContent)
    this.commentShowTarget.textContent = newContent
    //  post api
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