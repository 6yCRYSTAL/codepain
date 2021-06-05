import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = [ 'privateIcon', 'privateCheck']
  static values = {
    random: String,
  }
  togglePrivate() {
    const icon = this.privateIconTarget
    const check = this.privateCheckTarget
    Rails.ajax({
      url: `/api/v1/pens/${this.randomValue}/private`,
      type: 'post',
      success: (data) => {
        check.checked = data.payload.boolean;
        if(check.checked === true){
          icon.classList.remove("hidden");
          icon.dataset.isPrivate = check.checked;
        }else{
          icon.classList.add("hidden");
          icon.dataset.isPrivate = check.checked;
        }
      }
    })
  }
  stopPropagation(e) {
    e.stopPropagation()
  }
  // 撈出是否是 isPrivate
  connect() {
    const icon = this.privateIconTarget
    let isPrivate = icon.dataset.isPrivate
    if (isPrivate === 'true') {
      icon.classList.remove("hidden");
    }
  }
}