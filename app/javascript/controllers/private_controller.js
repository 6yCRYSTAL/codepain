import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = [ 'privateIcon', 'privateCheck' ]
  static values = { random: String }

  togglePrivate() {
    const icon = this.privateIconTarget
    const check = this.privateCheckTarget
    // console.log(check)
    Rails.ajax({
      url: `/api/v1/pens/${this.randomValue}/private`,
      type: 'post',
      success: (data) => {
        check.checked = data.payload.boolean
        icon.classList.toggle("hidden")
      }
    })
  }

  stopPropagation(e) {
    e.stopPropagation()
  }
}