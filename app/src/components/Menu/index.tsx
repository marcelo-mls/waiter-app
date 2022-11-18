import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { ProductDetails, Product, ProductImage, Separator, AddToCartButton } from './styles';
import { Text } from '../Text';
import formatCurrency from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import ProductModal from '../ProductModal';
import { useState } from 'react';
import { IProduct } from '../../interfaces/interfaces';

function Menu() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | IProduct>(null);

  function handleOpenModal(product: IProduct) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

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
                uri: `http://192.168.1.16:3001/uploads/${item.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight='600'>{item.name}</Text>
              <Text size={14} color='#666' style={{ marginVertical: 8 }}>{item.description}</Text>
              <Text size={14} weight='600'>{formatCurrency(item.price)}</Text>
            </ProductDetails>

            <AddToCartButton>
              <PlusCircle />
            </AddToCartButton>
          </Product>
        )}
      />

      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
      />

    </>
  );
}

export default Menu;