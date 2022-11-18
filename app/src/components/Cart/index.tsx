import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem, IProduct } from '../../interfaces/interfaces';
import { Item, ProductContainer, Actions, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from './styles';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Text } from '../Text';
import formatCurrency from '../../utils/formatCurrency';
import Button from '../Button/index';


interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

function Cart(props: CartProps) {
  const { cartItems, onAdd, onRemove } = props;

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);



  return (
    <>
      {cartItems.length > 0 &&
        (<FlatList
          data={cartItems}
          keyExtractor={(item) => item.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 12, maxHeight: 100}}
          renderItem={({item}) => (
            <Item>

              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.1.16:3001/uploads/${item.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">{item.quantity}x</Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">{item.product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>{formatCurrency(item.product.price)}</Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 16 }}
                  onPress={() => onAdd(item.product)}
                >
                  <PlusCircle/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRemove(item.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>

            </Item>
          )}
        />
        )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text size={14} color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text size={14} color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={() => alert('confirmar pedido')}
          disabled={cartItems.length === 0}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}

export default Cart;