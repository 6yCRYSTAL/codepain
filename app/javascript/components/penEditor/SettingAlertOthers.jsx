import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../../styles/editor-setting.scss'
import EditorSettingContainer from './settingComponents/EditorSettingContainer'

const SettingAlert = () => {
  const MySwal = withReactContent(Swal)

  MySwal.fire({
    background: 'black',
    position: 'center',
    // allowOutsideClick: false,
    // allowEscapeKey: false,
    allowEnterKey: false,
    titleText: 'CDN Setting',
    customClass: {
      popup: 'setting-popup',
      confirmButton: 'setting-close',
      title: 'setting-title'
    },
    focusConfirm: false,
    html: <EditorSettingContainer />,
    confirmButtonText: 'Close',
    confirmButtonColor: '#47cf73'
  })
}

export default SettingAlert