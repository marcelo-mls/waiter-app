import { Order } from '../../interfaces/Order';
import { Board, OrdersContainer } from './style';
import OrderModal from '../OrderModal';
import { useState } from 'react';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeStatus: (orderId: string, status: Order['status']) => void;
}

function OrdersBoard(props: OrdersBoardProps) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setModalVisibility(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setModalVisibility(false);
    setSelectedOrder(null);
  }

  const {icon, title, orders, onCancelOrder, onChangeStatus} = props;

  async function handleCancelOrder() {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setModalVisibility(false);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const newStatus = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status: newStatus });

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve status alterado`);
    onChangeStatus(selectedOrder!._id, newStatus);
    setIsLoading(false);
    setModalVisibility(false);
  }

  return(
    <Board>
      <OrderModal
        visible={modalVisibility}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeStatus={handleChangeOrderStatus}
      />
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