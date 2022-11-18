import { FlatList, Modal } from 'react-native';
import { IProduct } from '../../interfaces/interfaces';
import { Text } from '../Text';
import { Image, CloseButton, Header, ModalBody, IngredientsContainer, Ingredient, FooterContainer, Footer, PriceContainer } from './styles';
import { Close } from '../Icons/Close';
import formatCurrency from '../../utils/formatCurrency';
import Button from '../Button/index';

interface ProductModal {
  visible: boolean;
  onClose: () => void;
  product: null | IProduct;
  onAddToCart: (product: IProduct) => void;
}

function ProductModal(props: ProductModal) {
  const {visible, onClose, product, onAddToCart} = props;

  if (!product) { return null; }

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.1.16:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">{product.name}</Text>
          <Text color="#666" style={{ marginTop: 8 }}>{product.description}</Text>
        </Header>

        {(product.ingredients.length > 0 &&
          <IngredientsContainer>

            <Text color="#666" weight="600">Ingredientes</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({item}) => (
                <Ingredient>
                  <Text>{item.icon}</Text>
                  <Text color="#666" size={14} style={{ marginLeft: 20 }}>{item.name}</Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}

      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button onPress={handleAddToCart}>
            Adicionar ao Pedido
          </Button>
        </FooterContainer>
      </Footer>

    </Modal>
  );
}

export default ProductModal;