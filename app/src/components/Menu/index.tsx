import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { ProductDetails, Product, ProductImage, Separator, AddToCartButton } from './styles';
import { Text } from '../Text';
import formatCurrency from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';

function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 16 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={(product) => product._id}
      ItemSeparatorComponent={Separator}
      renderItem={({item}) => (
        <Product>
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
  );
}

export default Menu;