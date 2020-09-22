import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { getOrders, postOrder } from '../../apiCalls';
jest.mock('../../apiCalls.js');

describe('App', () => {
  it('should render all orders from the server on load', async () => {
    getOrders.mockResolvedValueOnce([
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

  it('should allow the user to post an order', async () => {
    getOrders.mockResolvedValueOnce([
      {
        id: 1,
        name: "Pat",
        ingredients: [
          "beans",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno",
        ],
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
          "jalapeno",
        ],
      },
      {
        id: 3,
        name: "Alex",
        ingredients: [
          "sofritas",
          "beans",
          "sour cream",
          "carnitas",
          "queso fresco",
        ],
      }
    ]);

    postOrder.mockResolvedValueOnce({
      name: "Nick",
      ingredients: ["steak"],
      id: 4
    });

    getOrders.mockResolvedValueOnce([
      {
        id: 1,
        name: "Pat",
        ingredients: [
          "beans",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno",
        ],
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
          "jalapeno",
        ],
      },
      {
        id: 3,
        name: "Alex",
        ingredients: [
          "sofritas",
          "beans",
          "sour cream",
          "carnitas",
          "queso fresco",
        ],
      },
      {
        name: "Nick",
        ingredients: ["steak"],
        id: 4
      }
    ]);

    render(<App />);

    const nameField = screen.getByPlaceholderText('Name');
    const steakButton = screen.getByRole('button', {name: 'steak'});
    const submitButton = screen.getByText('Submit Order')
    
    fireEvent.change(nameField, {target: {value: 'Nick'} });
    fireEvent.click(steakButton);
    fireEvent.click(submitButton);
    
    const newOrder = await waitFor(() => screen.getByText('Nick'));

    expect(newOrder).toBeInTheDocument();
  });
})
