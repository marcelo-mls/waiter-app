import { Container } from './styles';
import OrdersBoard from '../OrdersBoard';
import { Order } from '../../interfaces/Order';

const orders: Order[] = [
  {
    '_id': '63741c0c53692c5b30c6a578',
    'table': '1',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'Cerveja',
          'imagePath': '1668551699013-cerveja.png',
          'price': 9,
        },
        'quantity': 3,
        '_id': '63741c0c53692c5b30c6a579'
      },
      {
        'product': {
          'name': 'Suco',
          'imagePath': '1668552569812-suco-de-laranja.png',
          'price': 10,
        },
        'quantity': 1,
        '_id': '63741c0c53692c5b30c6a57a'
      },
      {
        'product': {
          'name': 'Pizza 4 Queijos',
          'imagePath': '1668551401111-quatro-queijos.png',
          'price': 40,
        },
        'quantity': 2,
        '_id': '63741c0c53692c5b30c6a57b'
      }
    ],
  },
  {
    '_id': '63741c0c25104c5b30c6a578',
    'table': '3',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'Cerveja',
          'imagePath': '1668551699013-cerveja.png',
          'price': 9,
        },
        'quantity': 1,
        '_id': '63741c0c53692c5b30c6a579'
      },
      {
        'product': {
          'name': 'Pizza 4 Queijos',
          'imagePath': '1668551401111-quatro-queijos.png',
          'price': 40,
        },
        'quantity': 1,
        '_id': '63741c0c53692c5b30c6a57b'
      }
    ],
  }
];

function Orders() {
  return(
    <Container >

      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders}/>
      <OrdersBoard icon="👨‍🍳" title="Fila de preparação" orders={[]}/>
      <OrdersBoard icon="✅" title="Pronto!" orders={[]}/>

    </Container>
  );
}

export default Orders;