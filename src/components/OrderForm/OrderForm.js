import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  handleSubmit = e => {
    if (this.state.name.length > 0 && this.ingredients.length > 0) {
      e.preventDefault();
      this.clearInputs();
    } else {
      this.setState({ error: 'Please make sure you\'ve entered a name and order.' })
    }
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleInput(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleInput(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        {this.state.error && 
          <p>{ this.state.error }</p>
        }

        <button onClick={e => this.handleSubmit(e)} type="button">
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
