export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
      .then(orders => orders.orders)
      .catch(error => console.error(error.message))
}

export const postOrder = order => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    .catch(err => console.error(err.message));
}