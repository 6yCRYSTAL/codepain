import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'styles/editor-setting.scss'
import EditorSettingContainerOwner from './settingComponents/EditorSettingContainerOwner'
import Turbolinks from 'turbolinks'
import {renderToiframe, cssCDN, jsCDN, babelSwitch} from '../../editor/new_edit'

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
    html: <EditorSettingContainerOwner />,
    confirmButtonText: 'Close',
    confirmButtonColor: '#47cf73',
    willClose: () => {
      let editorHTML = ace.edit("editor--html")
      let editorCSS = ace.edit("editor--css")
      let editorJS = ace.edit("editor--js")
      let isReact = false



      renderToiframe(cssCDN, jsCDN, babelSwitch, editorCSS, editorHTML, editorJS)
    }
  })
}

export default SettingAlert