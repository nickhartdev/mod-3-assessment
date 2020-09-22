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

  it('should have a name input field that takes user input', () => {
    const nameField = screen.getByPlaceholderText('Name');
    fireEvent.change(nameField,  { target: { value: 'Nick' } });

    expect(nameField.value).toBe('Nick');
  })

  it('should display an error if the user tries to submit an order without a name', () => {
    const beansButton = screen.getByRole('button', { name: 'beans' });
    const hotSauceButton = screen.getByRole('button', { name: 'hot sauce' });
    const submitButton = screen.getByRole('button', { name: 'Submit Order'})

    fireEvent.click(beansButton);
    fireEvent.click(hotSauceButton);
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please make sure you\'ve entered a name and order.');

    expect(errorMessage).toBeInTheDocument();
  })

  it('should display an error if the user tries to submit the order without an ingredient selection', () => {
    const nameField = screen.getByPlaceholderText('Name');
    const submitButton = screen.getByRole('button', { name: 'Submit Order' })
    
    fireEvent.change(nameField, { target: { value: 'Nick' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please make sure you\'ve entered a name and order.');

    expect(errorMessage).toBeInTheDocument();
  })
})