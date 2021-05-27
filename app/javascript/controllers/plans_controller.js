import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['yearTitles', 'monthTitles',
                    'yearDetails', 'monthDetails',
                    'yearLinks', 'monthLinks',
                    'yearSwitchers', 'monthSwitchers']

  switch() {
    const yearTitles = this.yearTitlesTarget
    const monthTitles = this.monthTitlesTarget
    const yearDetails = this.yearDetailsTarget
    const monthDetails = this.monthDetailsTarget
    const yearLinks = this.yearLinksTarget
    const monthLinks = this.monthLinksTarget
    const yearSwitchers = this.yearSwitchersTarget
    const monthSwitchers = this.monthSwitchersTarget

    const year = [yearTitles, yearDetails, yearLinks, yearSwitchers]
    const month = [monthTitles, monthDetails, monthLinks, monthSwitchers]

    year.forEach(e => e.classList.toggle('hidden'))
    month.forEach(e => e.classList.toggle('hidden'))
  }
}