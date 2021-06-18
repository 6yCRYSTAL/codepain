import React from 'react'

const Iframe = ({ isNewPenIframe }) => {

  return (
    <iframe sandbox="allow-downloads allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      id="edit--result"
      className="edit-render-result"
      loading="lazy"
      style= {{
        background: isNewPenIframe && 'radial-gradient(circle, #444857, #2c303a)',
      }}
    ></iframe>
  )
}

export default Iframe