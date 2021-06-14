import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = [ 'followUser', 'unfollowUser', 'followWrap' ]
  static values = { random: String, username: String }

  showUser() {
    Rails.ajax({
      url: '/api/v1/user/follow',
      type: 'GET',
      data: `random_url=${this.randomValue}`,
      success: data => {
        if (data.payload.boolean) {
          this.followWrapTarget.innerHTML = `
            <button class="feature-related" data-action="click->follow#unfollow">
              <div class="follow-icon"><i class="fas fa-times"></i></div>
              <span>Unfollow @${this.usernameValue}</span>
            </button>
          `
        } else {
          this.followWrapTarget.innerHTML = `
            <button class="feature-related" data-action="click->follow#follow">
              <div class="follow-icon"><i class="fas fa-check"></i></div>
              <span>Follow @${this.usernameValue}</span>
            </button>
          `
        }
      }
    })
  }

  follow() {
    Rails.ajax({
      url: '/api/v1/user/follow',
      type: 'POST',
      data: `random_url=${this.randomValue}`,
      success: data => {
        if (data.payload.boolean) {
          this.followWrapTarget.innerHTML = `
            <button class="feature-related" data-action="click->follow#unfollow">
              <div class="follow-icon"><i class="fas fa-times"></i></div>
              <span>Unfollow @${this.usernameValue}</span>
            </button>
          `
        }
      }
    })
  }

  unfollow() {
    Rails.ajax({
      url: '/api/v1/user/unfollow',
      type: 'POST',
      data: `random_url=${this.randomValue}`,
      success: data => {
        if (!data.payload.boolean) {
          this.followWrapTarget.innerHTML = `
            <button class="feature-related" data-action="click->follow#follow">
              <div class="follow-icon"><i class="fas fa-check"></i></div>
              <span>Follow @${this.usernameValue}</span>
            </button>
          `
        }
      }
    })
  }
}