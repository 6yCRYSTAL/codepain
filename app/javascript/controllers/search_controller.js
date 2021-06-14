import { Controller } from "stimulus"
import Turbolinks from "turbolinks"

export default class extends Controller {
  static targets = ['searchInput','clearSearch', 'sortBySelected']
  initialize(){
    const searchInput = this.searchInputTarget.value
    if(location.href.includes(`search_term=${ searchInput }`)){
      localStorage.setItem('searchPen','1')
    }else{
      localStorage.setItem('searchPen','0')
    }
  }
  connect() {
    if (location.href.includes('sort_order')) {
      document.querySelector('.sortOrderASC').classList.add('order-active')
    } else {
      document.querySelector('.sortOrderDESC').classList.add('order-active')
    }
    if (this.searchInputTarget.value) {
      this.clearSearchTarget.style.display = 'inline-block'
    }
  }

  submitSearch(e) {
    e.preventDefault()
    const searchInput = this.searchInputTarget.value
    const url = new URL(location.href)
    const params = url.searchParams
    params.set('search_term', searchInput)
    params.delete('page')
    if (searchInput && !(location.href.includes('grid_type=grid'))) {
      Turbolinks.visit(url)
    }
    // 按下搜尋 判斷 searchNoPen noPen 頁面
    localStorage.setItem('searchPen','1')
  }

  submitSelected() {
    const searchInput = this.searchInputTarget.value
    const sortBySelected = this.sortBySelectedTarget
    const url = new URL(location.href)
    const params = url.searchParams

    params.set('sort_by', sortBySelected.value)
    if (!(location.href.includes('grid_type=grid'))) {
      Turbolinks.visit(url)
    }
    // 不等於空值 維持 searchPen El
    if(!(searchInput === '')){
      localStorage.setItem('searchPen','1')
    }
  }
  sortByBtn() {
    const searchInput = this.searchInputTarget.value
    // 不等於空值 維持 searchPen El
    if(!(searchInput === '')){
      localStorage.setItem('searchPen','1')
    }
  }

}