import React from 'react'
import '../../styles/index_editor.css'

const Iframe = () => {

  return (
    <iframe sandbox="allow-downloads allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            id="edit--result"
            className="edit-render-result"
            loading="lazy"></iframe>
  )
}

export default Iframe