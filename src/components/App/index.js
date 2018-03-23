import React, { Component } from 'react';
import logo from '../../logo.svg';
import { object } from 'prop-types';
import './App.css';
import { addRecipe } from "../../actions";

class App extends Component {
  static propTypes = {
    store: object,
  }

  state = {
    calendar: null,
  }

  submitFood = () => {
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.input.value
      }
    }))
    this.input.value = ''
  }

  componentDidMount = () => {
    const { store } = this.props;

    store.subscribe(() => {
      this.setState(() => ({
        calendar: store.getState()
      }))
    })

  }

  render() {
    return (
      <div>
        <input
          type='text'
          placeholder="Monday's breakfast"
          ref={(input) => this.input = input}
        />
        <button onClick={this.submitFood}>
          Submit
        </button>

        <pre>
          Monday's breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    );
  }
}

export default App;
