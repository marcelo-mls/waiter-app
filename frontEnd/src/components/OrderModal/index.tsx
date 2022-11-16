import { Overlay, ModalBody, OrderDetail, Actions } from './style';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../interfaces/Order';
import formatCurrency from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

function OrderModal(props: OrderModalProps) {
  const {visible, order, onClose} = props;

  if (!visible || !order) {
    return null;
  }

  let total = 0;
  order.products.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return(
    <Overlay>
      <ModalBody>

        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button">
            <img src={closeIcon} alt="ícone de fechamento" onClick={onClose}/>
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
                  width="86"
                  height="43.78"
                />
                <span className="quantity">{item.quantity}x</span>

                <div className="product-details">
                  <strong>{item.product.name}</strong>
                  <span>{formatCurrency(item.product.price)}</span>
                </div>

              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetail>

        <Actions>
          <button type="button" className='primary'>
            <span>
              {order.status === 'WAITING' && '👨‍🍳'}
              {order.status === 'IN_PRODUCTION' && '✅'}
            </span>
            <span>
              {order.status === 'WAITING' && 'Iniciar Produção'}
              {order.status === 'IN_PRODUCTION' && 'Concluir Pedido!'}
            </span>
          </button>

          {order.status !== 'DONE' &&
          <button type="button" className='secondary'>
            <span>Cancelar</span>
          </button>}
        </Actions>

      </ModalBody>
    </Overlay>
  );
}

export default OrderModal;