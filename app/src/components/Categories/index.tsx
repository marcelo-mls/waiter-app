import { useState } from 'react';
import { FlatList } from 'react-native';
import { Category } from '../../interfaces/interfaces';
import { Text } from '../Text';
import { CategoryContainer, Icon } from './styles';

interface CategoriesProps {
  categories: Category[];
}

function Categories(props: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
  }

  const { categories } = props;

  return (
    <FlatList
      data={categories}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item }) => {
        const isSelected = selectedCategory === item._id;

        return (
          <CategoryContainer onPress={() => handleSelectCategory(item._id)} >

            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>
                {item.icon}
              </Text>
            </Icon>

            <Text size={14} opacity={isSelected ? 1 : 0.5}>
              {item.name}
            </Text>

          </CategoryContainer>
        );
      }}
    />
  );
}

export default Categories;