import { FlatList } from 'react-native';
import { ProductDetails, Product, ProductImage, Separator, AddToCartButton } from './styles';
import { Text } from '../Text';
import formatCurrency from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import ProductModal from '../ProductModal';
import { useState } from 'react';
import { IProduct } from '../../interfaces/interfaces';
import { localHostWithPort } from '../../utils/networkUtils';

interface MenuProps {
  onAddToCart: (product: IProduct) => void;
  products: IProduct[];
}

function Menu(props: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | IProduct>(null);

  function handleOpenModal(product: IProduct) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  const { onAddToCart, products } = props;

  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 16 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => (
          <Product onPress={() => handleOpenModal(item)}>
            <ProductImage
              source={{
                uri: `http://${localHostWithPort}/uploads/${item.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight='600'>{item.name}</Text>
              <Text size={14} color='#666' style={{ marginVertical: 8 }}>{item.description}</Text>
              <Text size={14} weight='600'>{formatCurrency(item.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(item)}>
              <PlusCircle />
            </AddToCartButton>
          </Product>
        )}
      />

      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

    </>
  );
}

export default Menu;