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
      value: 'name = input("What is your name ?")',
      output: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    let value = this.state.value;
    console.log(value)
    const matches = value.match(/[input]+\([^\)]*\)(\.[^\)]*\))?/g)
    console.log(matches)
    for (const match in matches) {
      console.log(match)
      const replacement = "\"" + String(prompt(match)) + "\""
      value = value.replace(match, replacement)
    }
    console.log(value)
    try {
      const response = await axios.post('/execute', { code: value });
      this.setState({ output: response.data });
    } catch (error) {
      if (error.response) {
        // The client was given an error response (5xx, 4xx)
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The client never received a response, and the request was never left
        console.log(error.request);
      } else {
        // Anything else
        console.log('Error', error.message);
      }
    }
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
