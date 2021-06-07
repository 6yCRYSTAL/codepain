import { Controller } from "stimulus"
import Rails from '@rails/ujs'
import Swal from 'sweetalert2'
export default class extends Controller {
  static targets = ["commentLi", "deleteBtn", "realDeleteBtn", "deleteCancelBtn",]
  static values = { id: Number }

  delete() {
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
      title: '<p class="text-white font-bold text-left">Delete Confirmation',
      html: "<p>This will permanently delete this Comment.</p>",
      showCancelButton: true,
      confirmButtonText: `I understand, delete the Comment`
    }).then(result => {
      if (result.isConfirmed) {
        Rails.ajax({
          url: `/api/v1/comments/${this.idValue}`,
          type: 'DELETE',
          success: (data) => {
            if(data.status === "Destroied") {
              this.commentLiTarget.remove()
            }
          }
        })

        Swal.fire({
          position: 'top',
          width: '300px',
          html: '<p class="text-white text-base">Deleting this Comment.</p>',
          background: 'black',
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: 500,
          customClass: {
            popup: 'delete-pen-loading-popup'
          },
          showClass: {
            popup: 'block'
          },
          didOpen: () => {
            Swal.showLoading()
          }
        })
      }
    })
  }
}
