import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'styles/editor-setting.scss'
import EditorSettingContainerOthers from './settingComponents/EditorSettingContainerOthers'
import Turbolinks from 'turbolinks'

const SettingAlert = () => {
  const MySwal = withReactContent(Swal)

  MySwal.fire({
    background: 'black',
    position: 'center',
    allowEnterKey: false,
    titleText: 'CDN Setting',
    customClass: {
      popup: 'setting-popup',
      confirmButton: 'setting-close',
      title: 'setting-title',
      actions: 'setting-actions'
    },
    focusConfirm: false,
    html: <EditorSettingContainerOthers />,
    confirmButtonText: 'Close',
    confirmButtonColor: '#47cf73',
    willClose: () => {
      Turbolinks.visit(location, 'replace')
    }
  })
}

export default SettingAlert