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
    if (this.state.name.length > 0 && this.state.ingredients.length > 0) {
      const order = {
        name: this.state.name,
        ingredients: this.state.ingredients
      }

      this.props.addOrder(order);
      this.clearInputs();
    } else {
      this.setState({ error: 'Please make sure you\'ve entered a name and order.' })
    }
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  hideErrorMessage = () => {
    this.setState({ error: '' });
  }

  toggleIngredientSelection = e => {
    this.hideErrorMessage();
    if (!this.state.ingredients.includes(e.target.name)) {
      this.setState({ ingredients: [...this.state.ingredients, e.target.name] })
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.toggleIngredientSelection(e)} type="button">
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
          onChange={e => this.handleNameChange(e)}
          onClick={this.hideErrorMessage}
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
