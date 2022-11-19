import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem, IProduct } from '../../interfaces/interfaces';
import { Item, ProductContainer, Actions, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from './styles';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Text } from '../Text';
import formatCurrency from '../../utils/formatCurrency';
import Button from '../Button/index';
import OrderConfirmedModal from '../OrderConfirmedModal';
import { useState } from 'react';
import { api, localHostWithPort } from '../../utils/api';


interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
  onConfirmOrder:() => void;
  selectedTable: string;
}

function Cart(props: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, onAdd, onRemove, onConfirmOrder, selectedTable } = props;

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    const products = cartItems.map((item) => (
      {
        product: item.product._id,
        quantity: item.quantity
      }
    ));

    const payload = {
      table: selectedTable,
      products,
    };

    setIsLoading(true);
    await api.post('/orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOK() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>

      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOK}
      />

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
                    uri: `http://${localHostWithPort}/uploads/${item.product.imagePath}`,
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
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}

export default Cart;