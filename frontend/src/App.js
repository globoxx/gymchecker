import logo from './logo.svg';
import './App.css';
import React from 'react';

class CodeEditor extends React.Component {
  componentDidMount() {
    this.editor = CodeMirror(this.node, {
        lineNumbers: true,
        mode: "python"
    });
  }

  render() {
    return (
        <form action="{{ url_for('execute') }}" method="post">
            <textarea ref={node => this.node = node} name="code"></textarea>
            <br />
            <input type="submit" value="Execute" />
        </form>
    );
  }
}

function App() {
  return <CodeEditor />;
}

export default App;
