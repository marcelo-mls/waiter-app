import { Container } from './styles';
import OrdersBoard from '../OrdersBoard';

function Orders() {
  return(
    <Container >

      <OrdersBoard icon="🕒" title="Fila de espera"/>
      <OrdersBoard icon="👨‍🍳" title="Fila de preparação"/>
      <OrdersBoard icon="✅" title="Pronto!"/>

    </Container>
  );
}

export default Orders;