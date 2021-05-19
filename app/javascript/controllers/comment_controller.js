import { Controller } from "stimulus"
import Rails from '@rails/ujs'


export default class extends Controller {

  connect() {
  }

  static targets = [ "editBtn", "cancelBtn", "commentBlock", "textarea", "commentShow", "updateBtn"]

  initialize() {
    this.comment_id = parseInt(this.data.get("id"))
  }


  edit() {
    this.commentBlockTarget.classList.add("appear")
    this.textareaTarget.value = this.commentShowTarget.textContent
  }

  update() {
    this.commentShowTarget.textContent = this.textareaTarget.value
    //  post api
    this.commentBlockTarget.classList.remove("appear")
  }

  cancel() {
    this.commentBlockTarget.classList.remove("appear")
  }

}