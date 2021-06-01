import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = [ 'heart', "heartListsCount" ]
  static values = { heart: Boolean, random: String, heartListsCount: Number }
  static classes = [ 'loved' ]

  initialize() {
    this.heartListsCountTarget.textContent = this.heartListsCountValue
    if (this.heartValue) {
      this.heartTarget.classList.add(this.lovedClass)
    }
  }

  toggleHeart() {
    const heart = this.heartTarget
    const heartListsCount = this.heartListsCountTarget

    Rails.ajax({
      url: `/api/v1/pens/${this.randomValue}/love`,
      type: 'post'
      // TODO
    })

    heart.classList.toggle(this.lovedClass)

    if (heart.classList.contains(this.lovedClass)) {
      heartListsCount.textContent = (parseInt(heartListsCount.textContent) + 1)
    } else {
      heartListsCount.textContent = (parseInt(heartListsCount.textContent) - 1)
    }
  }
}