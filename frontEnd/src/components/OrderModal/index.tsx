import { Overlay, ModalBody, OrderDetail } from './style';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../interfaces/Order';
import formatCurrency from '../../utils/formatCurrency';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
}

function OrderModal(props: OrderModalProps) {
  const {visible, order} = props;

  if (!visible || !order) {
    return null;
  }

  return(
    <Overlay>
      <ModalBody>

        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button">
            <img src={closeIcon} alt="ícone de fechamento"/>
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕒'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDetail>
          <strong>Itens</strong>
          <div className="orders-itens">
            {order.products.map((item) => (
              <div className="item" key={item._id}>
                <img
                  src={`http://localhost:3001/uploads/${item.product.imagePath}`}
                  alt={item.product.name}
                  width="56"
                  height="28.51"
                />
                <span className="quantity">{item.quantity}x</span>

                <div className="product-details">
                  <strong>{item.product.name}</strong>
                  <span>{formatCurrency(item.product.price)}</span>
                </div>

              </div>
            ))}
          </div>
        </OrderDetail>

      </ModalBody>
    </Overlay>
  );
}

export default OrderModal;