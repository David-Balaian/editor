import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill'
addStyles()


function App() {
  const [val, setVal] = useState('<div>123456789</div><div>123456789</div><div>123456789</div>')
  const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')

  
  function applyCommand(tag) {
    const editor = document.getElementById('editor')
    const Element = document.createElement(tag);
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);
    selectedTextRange.surroundContents(Element);
    editor.focus()
  }

  function applyCommandStyles(styles) {
    const editor = document.getElementById('editor')
    const Element = document.createElement('span');
    for (const key in styles) {
      Element.style[key] = styles[key]
    }
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);
    selectedTextRange.surroundContents(Element);
    editor.focus()
  }


  const handleEdit = (e) => {
    console.log(e.target.innerHTML);
  }

  useEffect(()=>{
    const editor = document.getElementById('editor')
    editor.addEventListener('keydown', handleEdit)
  }, [])


  const applyLatexCommand = (command) => {
    setLatex(command)
  }

  const math = <StaticMathField>{latex}</StaticMathField>

  return (
    <div className="App">
      <div className='controlls'>
        <button onClick={()=>{applyCommand('strong')}}>bold</button>
        <button onClick={()=>{applyCommand('em')}}>italic</button>
        <button onClick={()=>{applyCommandStyles({color: 'red'})}}>red</button>
        <button onClick={()=>{applyCommandStyles({backgroundColor: 'blue'})}}>bg blue</button>
        <button onClick={()=>{applyCommandStyles({fontSize: '34px'})}}>font 34px</button>
      </div>
      <div contentEditable={true} id='editor'>
        {parse(val)}
        {math}
      </div>
      <div className='controlls'>
        <button onClick={()=>{applyLatexCommand('\\frac{1}{x}')}}>1/x</button>
        {/* <button onClick={()=>{applyCommand('em')}}>italic</button>
        <button onClick={()=>{applyCommandStyles({color: 'red'})}}>red</button>
        <button onClick={()=>{applyCommandStyles({backgroundColor: 'blue'})}}>bg blue</button>
        <button onClick={()=>{applyCommandStyles({fontSize: '34px'})}}>font 34px</button> */}
      </div>
      <EditableMathField
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex())
        }}
      />
    </div>
  );
}

export default App;
