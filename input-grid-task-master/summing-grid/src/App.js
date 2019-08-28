import './App.css';
import React, { Component } from 'react';
import { InputCell } from './components/InputCell';
import { abbreviateNumber } from './utils/Format';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputCells: Array(3).fill('')
    };
  }

  renderInputCell(i) {
    return (
      <InputCell
        value={this.state.inputCells[i]}
        onChange={(e) => this.handleChange(i, e)}
        key={i}
      />
    );
  }

  handleChange(i, event) {
    const inputCells = this.state.inputCells.slice();
    // let's keep the original value for consistent ux
    // rather than have inputs potentially shift around
    // after being entered
    inputCells[i] = event.target.value;
    this.setState({ inputCells: inputCells });
  }

  displaySum() {
    let sum = 0;
    let error = false;
    // we can do checks and conversions here
    // if performance ever becomes an issue, can can optimize
    for (let i = 0; i < this.state.inputCells.length; i++) {
      if (isNaN(this.state.inputCells[i])) {
        error = true;
        break;
      }
      sum += this.state.inputCells[i] ? parseFloat(this.state.inputCells[i]) : 0;
    }
    return error ? 'Please make sure your inputs are numeric' : abbreviateNumber(sum);
  }

  render() {
    const inputCells = this.state.inputCells.map((value, i) => {
      return (
        this.renderInputCell(i)
      );
    });

    return (
      <div className="App">
        {inputCells}
        <div className="OutputCell AppCell">{this.displaySum()}</div>
      </div>
    );
  }

}

export { App };
