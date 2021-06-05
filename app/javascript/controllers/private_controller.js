import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {

  static targets = [ 'privateIcon', 'privateCheck' ,'privateIcon2']
  static values = {
    random: String,
  }
  togglePrivate() {
    const icon = this.privateIconTarget
    const icon2 = this.privateIcon2Target
    const check = this.privateCheckTarget
    Rails.ajax({
      url: `/api/v1/pens/${this.randomValue}/private`,
      type: 'post',
      success: (data) => {
        check.checked = data.payload.boolean;
        if(check.checked === true){
          icon.classList.remove("hidden");
          icon2.classList.remove("hidden");
          icon.dataset.isPrivate = check.checked;
          icon2.dataset.isPrivate = check.checked;
        }else{
          icon.classList.add("hidden");
          icon2.classList.add("hidden");
          icon.dataset.isPrivate = check.checked;
          icon2.dataset.isPrivate = check.checked;
        }
      }
    })
  }
  stopPropagation(e) {
    e.stopPropagation()
  }
  // 第一次:撈出每個 pen 的 isPrivate 狀態
  initialize() {
    const icon = this.privateIconTarget
    const icon2 = this.privateIcon2Target
    let isPrivate = icon.dataset.isPrivate
    let isPrivate2 = icon2.dataset.isPrivate

    if (isPrivate === 'true') {
      icon.classList.remove("hidden");
    }
    if (isPrivate2 === 'true') {
      icon2.classList.remove("hidden");
    }
  }
}