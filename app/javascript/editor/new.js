import "ace-builds/src-noconflict/ace.js"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/ext-error_marker"

document.addEventListener('turbolinks:load', () => {
  //set Ace
  ace.require("ace/ext/language_tools");
  let editorHTML = ace.edit("editor--html")
  let editorCSS = ace.edit("editor--css")
  let editorJS = ace.edit("editor--js")

  let init = () => {
    //set options
    editorHTML.setOptions({
      mode: "ace/mode/html",
      theme: "ace/theme/twilight",
      highlightActiveLine: true,
      fontFamily: 'monospace',
      fontSize: '12pt',
      tabSize: '2',
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
    editorHTML.getSession().on('change',function(){
      renderToiframe()
    })
    editorCSS.getSession().on('change',function(){
      renderToiframe()
    })
    editorJS.getSession().on('change',function(){
      renderToiframe()
    })
  }

   postMessage
  //render to iframe
  let renderToiframe  = () => {
    let result = document.querySelector('#edit--result').contentDocument
    result.open()
    result.write(`${editorHTML.session.getValue()}`)
    result.write(`<style>${editorCSS.session.getValue()}</style>`)
    result.write(`<script>${editorJS.session.getValue()}</script>`)
    result.close()
  }
  
  // get console 
  const consoleResult = document.querySelector('.edit-console')
  const editConsole = document.querySelector('#console-btn')
  const clearConsole = document.querySelector('#clear-console-btn')
  
  // 把 原本的console 備份起來
  let oldConsole = console

  editConsole.addEventListener('click', ()=>{
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
      } catch (err) {
        let msg = `${err.name}: ${err.message}`
        consoleResult.innerText = msg
      }
      // 恢復原本的 console.log
      window.console = oldConsole
    })
  })
  // clear console
  clearConsole.addEventListener('click', () => {
    consoleResult.innerText = ""
  })


  //share btn get web url
  document.querySelector('#edit-share-btn').addEventListener('click', () => {
    alert(location.href)
  })

  init()
  renderToiframe()
})

