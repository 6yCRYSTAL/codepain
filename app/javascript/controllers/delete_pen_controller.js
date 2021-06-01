import { Controller } from 'stimulus'
import Rails from '@rails/ujs'
import Swal from 'sweetalert2'
import Turbolinks from 'turbolinks'

export default class extends Controller {
  static targets = [ 'deleteBtn',
                     'trashedPen',
                     'trashedPenTitle',
                     'restoreBtn',
                     'restoreNotice',
                     'deleteNotice',
                     'reallyDeleteBtn'
                    ]
  static values = { id: Number }

  restore() {
    let randomURL
    let username
    Rails.ajax({
      url: `/api/v1/deleted_pens/${this.idValue}`,
      type: 'PATCH',
      data: `pen[id]=${this.idValue}`,
      success: (data) => {
        randomURL = data.payload.random_url
        username = data.payload.username
      }
    })

    setTimeout(() => {
      this.restoreBtnTarget.classList.add('hidden')
      this.reallyDeleteBtnTarget.classList.add('hidden')
      this.trashedPenTitleTarget.classList.add('trashed-pulse-active')
      this.restoreNoticeTarget.classList.remove('hidden')
      setTimeout(() => {
        this.trashedPenTarget.remove()
        Turbolinks.visit(`${location.origin}/${username}/pen/${randomURL}`)
      }, 1800)
    }, 1000)
  }

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
              url: `/api/v1/deleted_pens/${this.idValue}`,
              type: 'DELETE',
              data: `pen[id]=${this.idValue}`
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
        const editPagePath = location.pathname
        const userName = editPagePath.split('/')[1]
        const randomURL = editPagePath.split('/').pop()
        const penDelParams = `user[username]=${userName}&pen[random_url]=${randomURL}`

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
            Rails.ajax({
              url: editPagePath,
              type: 'DELETE',
              data: penDelParams
            })
            Turbolinks.clearCache()
            Turbolinks.visit(`${location.origin}/your-work`)
          }
        })
      }
    })
  }
}