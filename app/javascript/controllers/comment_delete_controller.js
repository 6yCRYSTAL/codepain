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
        cancelButton: 'delete-pen-cancel',
        title: 'delete-and-comment-popup-title'
      },
      showClass: {
        popup: 'block'
      },
      hideClass: {
        popup: 'hidden'
      },
      buttonsStyling: false,
      titleText: 'Delete Confirmation',
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
          titleText: 'Deleting this Comment.',
          background: 'black',
          allowOutsideClick: false,
          allowEscapeKey: false,
          timer: 500,
          customClass: {
            popup: 'delete-pen-loading-popup',
            title: 'delete-and-comment-loading-popup-title'
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
