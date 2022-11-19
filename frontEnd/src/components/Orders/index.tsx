import { Container } from './styles';
import OrdersBoard from '../OrdersBoard';
import { useState, useEffect } from 'react';
import { Order } from '../../interfaces/Order';
import { api } from '../../utils/api';
import socketIo from 'socket.io-client';

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001' , {
      transports: ['websocket'],
    });

    socket.on('order@new', (order) => {
      setOrders((prevState) => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get('/orders')
      .then((response) => setOrders(response.data));
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId ? {...order, status } : order
    )));
  }

  return(
    <Container >

      <OrdersBoard icon="🕒" title="Fila de espera" orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleOrderStatusChange}
      />
      <OrdersBoard icon="👨‍🍳" title="Em preparação" orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleOrderStatusChange}
      />
      <OrdersBoard icon="✅" title="Pronto!" orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleOrderStatusChange}
      />

    </Container>
  );
}

export default Orders;