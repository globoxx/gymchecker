import './App.css';

import React from 'react';
import axios from 'axios';

import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'print("hello world!")',
      output: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const value = this.state.value;
    const response = await axios.post('/execute', { code: value });
    this.setState({ output: response.data });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CodeMirror
            value={this.state.value}
            onChange={value => this.setState({ value })}
            height="200px"
            theme={okaidia}
            extensions={[python()]}
          />
          <br />
          <input type="submit" value="Execute" />
        </form>
        <div>{this.state.output}</div>
      </div>
    );
  }
}

export default App;
