import React from 'react';
import { render, screen } from '@testing-library/react';
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
})