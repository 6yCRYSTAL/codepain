import { Controller } from 'stimulus'
import Rails from '@rails/ujs'
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'

export default class extends Controller {
  static targets = [ 'followUser' ]
  static values = { random: String, username: String }

  showUser() {
    Rails.ajax({
      url: '/api/v1/user/follow',
      type: 'GET',
      success: data => {
        
      }
    })
    this.followUserTarget.innerHTML = `Follow \@${this.usernameValue}`
  }

  follow() {
    const params = `random_url=${this.randomValue}`
    console.log(this.randomValue);
    Rails.ajax({
      url: '/api/v1/user/follow',
      type: 'POST',
      data: params,
      success: data => {
        console.log(data);
      }
    })

  }

  unfollow() {

  }
}