import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    getOrders()
      .then(orders => this.setState({ orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  addOrder = order => {
    postOrder(order)
      .then(res => this.setState({ orders: [...this.state.orders, res]}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={ this.addOrder }/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
