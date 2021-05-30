import { Controller } from 'stimulus'
import Rails from '@rails/ujs'
import Swal from 'sweetalert2'

export default class extends Controller {
  static targets = [ 'deleteBtn' ]
  connect() {
  }

  sendComfirmed() {
    const editPagePath = window.location.pathname
    const userName = editPagePath.split('/')[1]
    const randomURL = editPagePath.split('/').pop()
    const penDelParams = `user[username]=${userName}&pen[random_url]=${randomURL}`

    Rails.ajax({
      url: editPagePath,
      type: 'DELETE',
      data: penDelParams
    })
  }

  popup() {
    Swal.fire({
      position: 'top',
      title: 'Delete Confirmation',
      html:
        "<p>Here's what happens when you delete a Pen:</p>" +
        "<ul>" +
          "<li>The view count, hearts, tags, and comments are permanently deleted and cannot be restored.</li>" +
          "<li>A copy of the code in this Pen will be saved to the Deleted Items section of your Dashboard for 3 days.</li>" +
          "<li>After 3 days, that copy is permanently deleted. You can also manually delete it from your Deleted Items (more details).</li>" +
        "</ul>",
      showCancelButton: true,
      confirmButtonText: `I understand, delete My Pen`
    }).then(result => {
      if (result.isConfirmed) {
        const editPagePath = window.location.pathname
        const userName = editPagePath.split('/')[1]
        const randomURL = editPagePath.split('/').pop()
        const penDelParams = `user[username]=${userName}&pen[random_url]=${randomURL}`

        Rails.ajax({
          url: editPagePath,
          type: 'DELETE',
          data: penDelParams
        })

        Swal.fire({
          position: 'top',
          title: 'Deleting this Pen. Buckle up!',
          timer: 3000,
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            clearInterval(timerInterval)
            Turbolinks.clearCache()
            window.location.replace(`${window.location.host}/your-work`)
          }
        })
      }
    })
  }
}