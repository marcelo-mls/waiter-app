import { Container } from './styles';
import OrdersBoard from '../OrdersBoard';
import { useState, useEffect } from 'react';
import { Order } from '../../interfaces/Order';
import { api } from '../../utils/api';

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

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

  return(
    <Container >

      <OrdersBoard icon="🕒" title="Fila de espera" orders={waiting} onCancelOrder={handleCancelOrder}/>
      <OrdersBoard icon="👨‍🍳" title="Em preparação" orders={inProduction} onCancelOrder={handleCancelOrder}/>
      <OrdersBoard icon="✅" title="Pronto!" orders={done} onCancelOrder={handleCancelOrder}/>

    </Container>
  );
}

export default Orders;