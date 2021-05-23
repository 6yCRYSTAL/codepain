import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['yearTitle', 'monthTitle']

  connect() {}

  switch() {
    const yearTitle = this.yearTitleTarget
    const monthTitle = this.monthTitleTarget

    console.log(yearTitle);
  }
}