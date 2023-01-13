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
      output: '',
      inputs: []
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const value = this.state.value;
    try {
      const response = await axios.post('/execute', { code: value, inputs: this.state.inputs });
      if (response.data.startsWith("input>")) {
        const input = prompt(response.data);
        this.setState({ inputs: [...this.state.inputs, input] });
        this.handleSubmit(event);
      } else {
        this.setState({ output: response.data, inputs: [] });
      }
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

  handleInputChange = (event, index) => {
    let inputs = [...this.state.inputs];
    inputs[index] = event.target.value;
    this.setState({ inputs });
  }

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
          {this.state.inputs.map((input, index) => (
            <input key={index} type="text" value={input} onChange={(e) => this.handleInputChange(e, index)} placeholder="input" />
          ))}
          <input type="submit" value="Execute" />
        </form>
        <div>{this.state.output}</div>
      </div>
    );
  }
}

export default App;
