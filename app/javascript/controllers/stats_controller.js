import { Controller } from 'stimulus'
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = [ 'heart', 'heartListsCount' ]
  static values = { random: String }
  static classes = [ 'loved' ]

  initialize() {
    // list分頁中
    if (this.hasRandomValue) {
      Rails.ajax({
        url: `/api/v1/pens/${this.randomValue}/love`,
        type: 'GET',
        success: (data) => {
          let isLoved = data.payload.boolean
          let heart = this.heartTarget
          // list分頁中判斷是否被current user喜歡
          if (isLoved) {
            heart.classList.add(this.lovedClass)
          } else {
            heart.classList.remove(this.lovedClass)
          }
        }
      })
    }

    // editor頁面的pen是否被current user喜歡
    if (!this.hasRandomValue) {
      let randomURL = location.pathname.split('/').pop()

      Rails.ajax({
        url: `/api/v1/pens/${randomURL}/love`,
        type: 'GET',
        success: (data) => {
          let heart = this.heartTarget
          if(data.payload) {
            var isLoved = data.payload.boolean
          }

          if (isLoved) {
            heart.classList.add(this.lovedClass)
          } else {
            heart.classList.remove(this.lovedClass)
          }
        }
      })
    }
  }

  // list分頁中按愛心
  toggleHeart() {
    Turbolinks.clearCache()

    let heart = this.heartTarget
    let heartListsCount = this.heartListsCountTarget
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

  // editor頁面中按愛心
  toggleEditorHeart() {
    Turbolinks.clearCache()

    let heart = this.heartTarget
    let randomURL = location.pathname.split('/').pop()

    Rails.ajax({
      url: `/api/v1/pens/${randomURL}/love`,
      type: 'post'
    })

    heart.classList.toggle(this.lovedClass)
  }

  disconnect() {
    Turbolinks.clearCache()
  }
}