import { Controller } from "stimulus"
import Turbolinks from "turbolinks"

export default class extends Controller {
  static targets = ['searchInput','clearSearch', 'sortBySelected']

  connect() {
    if (this.searchInputTarget.value) {
      this.clearSearchTarget.classList.remove('hidden')
    }
  }

  submitSearch(e) {
    e.preventDefault()
    const searchInput = this.searchInputTarget.value
    const url = new URL(location.href)
    const params = url.searchParams

    params.set('search_term', searchInput)
    params.delete('page')

    if (searchInput) {
      Turbolinks.visit(url)
    }
  }

  submitSelected() {
    const sortBySelected = this.sortBySelectedTarget
    const url = new URL(location.href)
    const params = url.searchParams

    params.set('sort_by', sortBySelected.value)

    Turbolinks.visit(url)
  }
}