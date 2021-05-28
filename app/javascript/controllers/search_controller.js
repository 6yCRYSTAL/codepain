import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['clearSearch', 'searchInput', 'sortOrderASC', 'sortOrderDESC', 'sortBySelected']

  connect() {
    if (window.location.href.includes('sort_order')) {
      this.sortOrderASCTarget.classList.add('text-white')
    } else {
      this.sortOrderDESCTarget.classList.add('text-white')
    }
    if (this.searchInputTarget.value) {
      this.clearSearchTarget.classList.remove('hidden')
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

  changeSortOrder(e) {
    e.preventDefault()
    const sortOrderASC = this.sortOrderASCTarget
    const sortOrderDESC = this.sortOrderDESCTarget
    const URL = window.location.href
    const newURL = URL.replace('&sort_order=asc', '')

    if (URL.includes('sort_order')) {
      sortOrderASC.classList.add('text-white')
      sortOrderDESC.classList.remove('text-white')
    }

    window.location.replace(newURL)
  }

  submitSelected() {
    const sortBySelected = this.sortBySelectedTarget
    const URL = window.location.href
    const paramsLength = window.location.search.split('&').length
    const prevSelected = window.location.search.split('&').filter(param => param.includes('sort_by')).toString()

    if (URL.includes('sort_by') && (paramsLength === 1)) {
      var newURL = URL.replace(prevSelected, `?sort_by=${sortBySelected.options[sortBySelected.selectedIndex].value}`)

    } else if ((URL.includes('sort_by')) && (paramsLength > 1)) {
      var newURL = URL.replace(prevSelected, `sort_by=${sortBySelected.options[sortBySelected.selectedIndex].value}`)

    } else if ((!URL.includes('sort_by')) && (paramsLength > 1)) {
      var newURL = `${URL}&sort_by=${sortBySelected.options[sortBySelected.selectedIndex].value}`

    } else {
      var newURL = `${URL}?sort_by=${sortBySelected.options[sortBySelected.selectedIndex].value}`
    }

    window.location.replace(newURL)
  }
}