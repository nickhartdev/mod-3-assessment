import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { getOrders, postOrder } from '../../apiCalls';
jest.mock('../../apiCalls.js');

describe('App', () => {
  it('should render all orders from the server on load', async () => {
      getOrders.mockResolvedValue([
        {
          id: 1,
          name: "Pat",
          ingredients: [
            "beans",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno"
          ]
        },
        {
          id: 2,
          name: "Sam",
          ingredients: [
            "steak",
            "pico de gallo",
            "lettuce",
            "carnitas",
            "queso fresco",
            "jalapeno"
          ]
        },
        {
          id: 3,
          name: "Alex",
          ingredients: [
            "sofritas",
            "beans",
            "sour cream",
            "carnitas",
            "queso fresco"
          ]
        }
    ])

    render(<App />);

    const order1 = await waitFor(() => screen.getByText('Pat'));
    const order2 = await waitFor(() => screen.getByText('Sam'));
    const order3 = await waitFor(() => screen.getByText('Alex'));

    expect(order1).toBeInTheDocument();
    expect(order2).toBeInTheDocument();
    expect(order3).toBeInTheDocument();
  })
})
