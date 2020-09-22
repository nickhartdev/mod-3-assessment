import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderForm from './OrderForm';

describe('OrderForm', () => {
  beforeEach(() => {
    render(<OrderForm />)
  })

  it('should render all of the correct elements', () => {
    const nameField = screen.getByPlaceholderText('Name');
    const buttons = screen.getAllByRole('button');
    const orderText = screen.getByText('Order: Nothing selected');

    expect(nameField).toBeInTheDocument();
    expect(buttons.length).toBe(13);
    expect(orderText).toBeInTheDocument();
  })

  it('should render ingredient selections when their buttons are clicked', () => {
    const beansButton = screen.getByRole('button', {name: 'beans'});
    const hotSauceButton = screen.getByRole('button', {name: 'hot sauce'});

    fireEvent.click(beansButton);
    fireEvent.click(hotSauceButton);
    
    const updatedOrderText = screen.getByText('Order: beans, hot sauce');

    expect(updatedOrderText).toBeInTheDocument();
  })
})