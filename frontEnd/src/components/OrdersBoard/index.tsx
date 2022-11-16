import { Order } from '../../interfaces/Order';
import { Board, OrdersContainer } from './style';
import OrderModal from '../OrderModal';
import { useState } from 'react';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

function OrdersBoard(props: OrdersBoardProps) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order) {
    setModalVisibility(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setModalVisibility(false);
    setSelectedOrder(null);
  }

  const {icon, title, orders} = props;

  return(
    <Board>
      <OrderModal visible={modalVisibility} order={selectedOrder} onClose={handleCloseModal} />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>{`(${orders.length})`}</span>
      </header>

      {orders.length > 0 &&
        <OrdersContainer>
          {orders.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} iten(s)</span>
            </button>
          ))}
        </OrdersContainer>}
    </Board>
  );
}


export default OrdersBoard;