import { Controller } from "stimulus"
import Rails from '@rails/ujs'

export default class extends Controller {
  static targets = ['clearSearch', 'searchInput']

  initialize() {
    const clearSearch = this.clearSearchTarget
    if (this.searchInputTarget.value) {
      clearSearch.classList.remove('hidden')
    }
  }

  clearSearchInput(e) {
    e.preventDefault()
    const inputValue = this.searchInputTarget.value
    this.searchInputTarget.value = ''
    const URL = window.location.href

    if (URL.includes('&')) {
      var newURL = URL.replace(`search_term=${inputValue}&`, '')
    } else {
      var newURL = URL.replace(`search_term=${inputValue}`, '')
    }

    window.location.replace(newURL)
  }
}
