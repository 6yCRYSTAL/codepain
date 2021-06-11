import "ace-builds/src-noconflict/ace"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-javascript"
import "emmet-core/emmet"
import "ace-builds/src-noconflict/ext-emmet"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/ext-error_marker"
import "ace-builds/src-noconflict/snippets/javascript"

document.addEventListener('turbolinks:load', () => {
  const html = document.querySelector('#editor--html')
  const css = document.querySelector('#editor--css')
  const js = document.querySelector('#editor--js')

  if( html && css && js ){
    // set Ace
    let editorHTML = ace.edit("editor--html")
    let editorCSS = ace.edit("editor--css")
    let editorJS = ace.edit("editor--js")
    let isReact = false

    function init() {
      // set options
      editorHTML.setOptions({
        mode: "ace/mode/html",
        theme: "ace/theme/twilight",
        highlightActiveLine: true,
        fontFamily: 'monospace',
        fontSize: '12pt',
        tabSize: '2',
        enableEmmet: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      })
      editorCSS.setOptions({
        mode: "ace/mode/css",
        theme: "ace/theme/twilight",
        highlightActiveLine: true,
        fontFamily: 'monospace',
        fontSize: '12pt',
        tabSize: '2',
        enableEmmet: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      })
      editorJS.setOptions({
        mode: "ace/mode/javascript",
        theme: "ace/theme/twilight",
        highlightActiveLine: true,
        fontFamily: 'monospace',
        fontSize: '12pt',
        tabSize: '2',
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      })
    }

    // when editor session change excute renderToiframe()
    editorHTML.getSession().on('change',debounce( () => {
      renderToiframe()
    }) )
    editorCSS.getSession().on('change',debounce( () => {
      renderToiframe()
    }) )
    editorJS.getSession().on('change',debounce( () => {
      renderToiframe()
    }) )

    //debounce: render to iframe late
    function debounce( fn, delay = 1000){
      let timeout = null
      return () => {
        let context = this //editor session
        let args = arguments //keyboardEvent
        clearTimeout(timeout)

        timeout = setTimeout( () => {
          fn.apply(context, args)
        }, delay)
      }
    }

    function cssCDN () {
      let css = JSON.parse(localStorage.getItem('css'))
      if (css) {
        let cssCdnPrepared = css.map(({url}) => `<link rel="stylesheet" href="${url}"></link>`)
        return cssCdnPrepared.join('')
      } else {return ""}
    }

    function jsCDN () {
      let js = JSON.parse(localStorage.getItem('js'))
      if (js) {
        let jsCdnPrepared = js.map(({url}) => `<script src="${url}"></script>`)
        if (jsCdnPrepared.join('').includes('react')) {
          isReact = true
          jsCdnPrepared += '<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>'
        } else {isReact = false}
        return jsCdnPrepared
      } else {return ""}
    }

    function babelSwitch () {
      return isReact ? 'babel' : 'javascript'
    }

    // render to iframe
    function renderToiframe() {
      let result = document.querySelector('#edit--result')
      result.srcdoc =
        `<html>
          ${cssCDN()}
          <style>${editorCSS.getValue()}</style>
          <body>
            ${editorHTML.getValue()}
            ${jsCDN()}
            <script type="text/${babelSwitch()}">${editorJS.getValue()}</script>
          </body>
        </html>`
    }

    // show console
    const consolecontainer = document.querySelector('.edit-console-container')
    const consoleResult = document.querySelector('.edit-console')

    if(consolecontainer){
      consoleMsg()
    }
    // get console msg
    function consoleMsg() {
      // 先把原本的console 備份起來
      let oldConsole = console

      editorJS.getSession().on('change', debounce(()=>{
        let stdoutMsg = ""
        // 改寫 console
        window.console = {
          log: function(msg) {
            stdoutMsg += `${msg}\n`
          }
        }
        try{
          eval(editorJS.session.getValue())
          consoleResult.innerText = stdoutMsg
        } catch (e) {
          let msg = `${e.name}: ${e.message}`
          consoleResult.innerText = msg
        }
        // 恢復原本的 console.log
        window.console = oldConsole
      }) )
    }

    init()
    renderToiframe()
  }
})