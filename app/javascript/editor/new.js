import "ace-builds/src-noconflict/ace.js"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/ext-error_marker"


document.addEventListener('turbolinks:load', () => {
  //set Ace
  ace.require("ace/ext/language_tools")

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

  //TODO postMessage
  //render to iframe
  let renderToiframe  = () => {
    let result = document.querySelector('#edit--result').contentDocument
    result.open()
    result.write(`${editorHTML.session.getValue()}`)
    result.write(`<style>${editorCSS.session.getValue()}</style>`)
    result.write(`<script>${editorJS.session.getValue()}</script>`)
    result.close()
  }
  //TODO

  // get console 
  let consoleLogList = document.querySelector('.edit-console-ul')
  let consoleMessage = []

  let printToConsole = () => {
    consoleMessage.forEach(log => {
      const newLogItem = document.createElement('li')
      const newLogText = document.createElement('p')
      // const newLogText = document.createElement('pre')
  
      newLogItem.setAttribute('class', log.class)
      newLogText.textContent = `> ${log.message}`

      newLogItem.appendChild(newLogText)
      consoleLogList.appendChild(newLogItem)
    })
  }

  editorHTML.session.on('chane', () => {
    //get user insert code
    const userHTMLCode = editorHTML.getValue()

    //run in console
    try{
      userHTMLCode
    }catch(errMessage){
      console.error(errMessage);
    }
  })

  editorCSS.session.on('chane', () => {
    //get user insert code
    const userCSSCode = editorCSS.getValue()

    //run in console
    try{
      userCSSCode
    }catch(errMessage){
      console.error(errMessage);
    }
  })

  editorJS.session.on('chane', () => {
    //get user insert code
    const userJSCode = editorJS.getValue()

    //run in console
    try{
      userJSCode
    }catch(errMessage){
      console.error(errMessage);
    }
  }) 

  let clearConsoleScreen = () => {
    consoleMessage.length = 0

    while (consoleLogList.firstChild) {
      consoleLogList.removeChild(consoleLogList.firstChild)
    }

  }
  let clearBtn = document.querySelector('#clear-console-btn')
  clearBtn.addEventListener('click', () => {
    clearConsoleScreen()
  })



  //get web url
  document.querySelector('#edit-share-btn').addEventListener('click', () => {
    alert(location.href)
  })


  init()
  renderToiframe()
  printToConsole()

})
