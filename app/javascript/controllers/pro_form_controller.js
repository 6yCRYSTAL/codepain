import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['annual', 'monthly', 'switcher', 'totalCharge']

  initialize() {
    this.annual_rate = parseInt(this.annualTarget.dataset.annualRate)
    this.monthly_rate = parseInt(this.monthlyTarget.dataset.monthlyRate)
  }

  switch() {
    let monthlyBlock = this.monthlyTarget
    let switcher = this.switcherTarget
    monthlyBlock.classList.remove('hidden')
    switcher.classList.add('hidden')
  }

  monthlyToAnnual() {
    let annualRate = this.annual_rate
    let totalCharge = this.totalChargeTarget
    totalCharge.innerHTML = `<span>Total Charge:</span> $ ${annualRate}`
  }

  annualToMonthly() {
    let monthlyRate = this.monthly_rate
    let totalCharge = this.totalChargeTarget
    totalCharge.innerHTML = `<span>Total Charge:</span> $ ${monthlyRate}`
  }
}