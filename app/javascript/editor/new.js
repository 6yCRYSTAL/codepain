import "ace-builds/src-min-noconflict/ace.js"
import "ace-builds/webpack-resolver.js"
import "ace-builds/src-min-noconflict/ext-language_tools.js"
import "ace-builds/src-min-noconflict/mode-html.js"
import "ace-builds/src-min-noconflict/mode-css.js"
import "ace-builds/src-min-noconflict/mode-javascript.js"
import "emmet-core/emmet.js"
import "ace-builds/src-min-noconflict/ext-emmet.js"
import "ace-builds/src-min-noconflict/theme-twilight.js"
import "ace-builds/src-min-noconflict/ext-error_marker.js"
import "ace-builds/src-min-noconflict/snippets/javascript.js"

document.addEventListener('turbolinks:load', () => {
  const html = document.querySelector('#editor--html')
  const css = document.querySelector('#editor--css')
  const js = document.querySelector('#editor--js')

  if( html && css && js ){
    // set Ace
    let editorHTML = ace.edit("editor--html")
    let editorCSS = ace.edit("editor--css")
    let editorJS = ace.edit("editor--js")

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

    // render to iframe
    function renderToiframe() {
      let result = document.querySelector('#edit--result')
      result.srcdoc = `
        <html>
          <style>${editorCSS.getValue()}</style>
          <body>
              ${editorHTML.getValue()}
            <script type="text/javascript">${editorJS.getValue()}</script>
          </body>
        </html>`
    }

    // show console
    const consolecontainer = document.querySelector('.edit-console-container')
    const consoleResult = document.querySelector('.edit-console')
    const consoleBtn = document.querySelector('#console-btn')
    const clearConsoleBtn = document.querySelector('.edit-console-clear')
    const closeConsoleBtn = document.querySelector('.edit-console-close')

    // const iframeResult = document.querySelector('.iframe-result')
    const iframeConsole = document.querySelector('.iframe-and-console')

    consoleBtn.addEventListener('click', () => {
      consolecontainer.classList.toggle('on')
      iframeConsole.classList.toggle('on')
      // iframeResult.classList.toggle('off')
      consoleMsg()
      clearConsole()
    })

    // get console msg
    function consoleMsg() {
      // 先把原本的console 備份起來
      let oldConsole = console

      editorJS.getSession().on('change', ()=>{
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
      })
    }
    // clear console
    function clearConsole() {
      clearConsoleBtn.addEventListener('click', () => {
        consoleResult.innerText = ""
      })
    }
    // close console
    function closeConsole() {
      closeConsoleBtn.addEventListener('click', () => {
        consolecontainer.classList.toggle('on')
        iframeConsole.classList.toggle('on')
      })
    }

    init()
    renderToiframe()
    closeConsole()
  }
})