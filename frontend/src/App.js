import './App.css';

import React, { useState } from 'react';
import Sk from 'skulpt'

function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
          throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

function PythonEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = () => {
    Sk.configure({output: setOutput, read:builtinRead});
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    myPromise.then(function(mod) {
        console.log('success');
    },
        function(err) {
        console.log(err.toString());
    });
  }

  return (
    <div>
      <textarea value={code} onChange={e => setCode(e.target.value)} />
      <button onClick={handleSubmit}>Run</button>
      <pre>{output}</pre>
      <div id="mycanvas"></div> 
    </div>
  );
}

export default PythonEditor;