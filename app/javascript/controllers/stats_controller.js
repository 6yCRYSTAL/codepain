import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = [ 'heart', "heartListsCount" ]
  static values = { random: String, heartListsCount: Number }
  static classes = [ 'loved' ]

  initialize() {
    this.heartListsCountTarget.textContent = this.heartListsCountValue
    
    Rails.ajax({
      url: '/api/v1/pens/love',
      type: 'GET',
      success: (data) => {
        let found = data.payload.randomURL.find(element => element.random_url == this.randomValue)
        if (!!found) {
          this.heartTarget.classList.add(this.lovedClass)
        }
      }
    })
  }

  toggleHeart() {
    const heart = this.heartTarget
    const heartListsCount = this.heartListsCountTarget

    Rails.ajax({
      url: `/api/v1/pens/${this.randomValue}/love`,
      type: 'post'
    })

    heart.classList.toggle(this.lovedClass)

    if (heart.classList.contains(this.lovedClass)) {
      heartListsCount.textContent = (parseInt(heartListsCount.textContent) + 1)
    } else {
      heartListsCount.textContent = (parseInt(heartListsCount.textContent) - 1)
    }
  }
}