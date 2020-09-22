export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
      .then(orders => orders.orders)
      .catch(error => console.error(error.message))
}