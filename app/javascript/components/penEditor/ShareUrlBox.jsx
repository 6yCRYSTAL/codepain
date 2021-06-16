import React, { useRef } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'styles/new-edit.scss'

const ShareBox = () => {

  const refInput = useRef()

  function copyLink() {
    const url = refInput.current
    url.select()
    navigator.clipboard.writeText(url.value)

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      position: 'top',
      title: 'Copied Pen URL to clipboard!',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'copied-link-popup',
        title: 'copied-link-title'
      }
    })
  }

  return (
    <div className="share-box">Share The URL
      <input className="share-btn-input" defaultValue={window.location.href} ref={refInput} />
      <div className = "share-btn-copy" onClick={copyLink}> Copy Link </div>
    </div>
  )
}

export default ShareBox