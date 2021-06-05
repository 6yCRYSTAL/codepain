import { Controller } from 'stimulus'
import Rails from '@rails/ujs'
import Swal from 'sweetalert2'
import Turbolinks from 'turbolinks'

export default class extends Controller {
  static targets = [ 'trashedPen',
                     'trashedPenTitle',
                     'restoreBtn',
                     'restoreNotice',
                     'deleteNotice',
                     'reallyDeleteBtn'
                    ]
  static values = { random: String, username: String }

  trashPopup() {
    Swal.fire({
      position: 'top',
      width: '600px',
      background: 'black',
      customClass: {
        htmlContainer: 'delete-pen-html-container',
        actions: 'delete-pen-actions',
        popup: 'delete-pen-popup',
        confirmButton: 'delete-pen-confirm',
        cancelButton: 'delete-pen-cancel'
      },
      showClass: {
        popup: 'block'
      },
      hideClass: {
        popup: 'hidden'
      },
      buttonsStyling: false,
      title: '<p class="text-white font-bold text-left">Are you sure you want ' +
             'to PERMANENTLY delete this?',
      html:
        '<p>It will be gone forever. Even CodePain support has no way to get it back. Be sure!</p>',
      showCancelButton: true,
      confirmButtonText: `DELETE`
    }).then(result => {
      if (result.isConfirmed) {
        setTimeout(() => {
          this.restoreBtnTarget.classList.add('hidden')
          this.reallyDeleteBtnTarget.classList.add('hidden')
          this.trashedPenTitleTarget.classList.add('trashed-pulse-active')
          this.deleteNoticeTarget.classList.remove('hidden')
          setTimeout(() => {
            Rails.ajax({
              url: `/api/v1/deleted_pens/${this.randomValue}`,
              type: 'DELETE',
              data: `pen[id]=${this.randomValue}`
            })
            this.trashedPenTarget.remove()
          }, 1800)
        }, 1000)
      }
    })
  }

  popup() {
    Swal.fire({
      position: 'top',
      width: '600px',
      background: 'black',
      padding: '10px',
      customClass: {
        htmlContainer: 'delete-pen-html-container',
        actions: 'delete-pen-actions',
        popup: 'delete-pen-popup',
        confirmButton: 'delete-pen-confirm',
        cancelButton: 'delete-pen-cancel'
      },
      showClass: {
        popup: 'block'
      },
      hideClass: {
        popup: 'hidden'
      },
      buttonsStyling: false,
      title: '<p class="text-white font-bold text-left">Delete Confirmation',
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
        if ((!!this.hasUsernameValue) && (!!this.hasRandomValue)) {
          var username = this.usernameValue
          var randomURL = this.randomValue

        } else {
          var editPagePath = location.pathname
          var username = editPagePath.split('/')[1]
          var randomURL = editPagePath.split('/').pop()
        }

        var penDelParams = `user[username]=${username}&pen[random_url]=${randomURL}`

        Swal.fire({
          position: 'top',
          width: '300px',
          html: '<p class="text-white text-base">Deleting this Pen.' +
                '<br>Buckle up!</br></p>',
          background: 'black',
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: 1600,
          customClass: {
            popup: 'delete-pen-loading-popup'
          },
          showClass: {
            popup: 'block'
          },
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            if ((!!editPagePath)) {
              Rails.ajax({
                url: editPagePath,
                type: 'DELETE',
                data: penDelParams
              })
            } else {
              Rails.ajax({
                url: `${username}/pen/${randomURL}`,
                type: 'DELETE',
                data: penDelParams
              })
            }
            Turbolinks.clearCache()
            Turbolinks.visit(`${location.origin}/your-work`)
          }
        })
      }
    })
  }
}