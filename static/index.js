import CodeMirror from 'codemirror';
import React from 'react';
import ReactDOM from 'react-dom';

class CodeEditor extends React.Component {
  componentDidMount() {
    this.editor = CodeMirror(this.node, {
        lineNumbers: true,
		tabSize: 4,
		mode: "python",
		theme: 'monokai'
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

ReactDOM.render(<CodeEditor />, document.getElementById('root'));
