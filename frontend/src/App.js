import logo from './logo.svg';
import './App.css';

import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

function App() {
  return (
    <CodeMirror
      value="console.log('hello world!');"
      height="200px"
      theme={okaidia}
      extensions={[python]}
    />
  );
}

export default App;
