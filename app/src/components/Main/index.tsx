import Header from '../Header';
import Categories from '../Categories';
import Menu from '../Menu';
import Button from '../Button';
import TableModal from '../TableModal';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';
import { useState } from 'react';

function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false);
  }

  return (
    <>
      <Container>

        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>

      </Container>

      <Footer>
        <FooterContainer>
          {/* {!selectedTable && ( */}
          <Button onPress={() => setIsTableModalVisible(true)}>
            Novo Pedido
          </Button>
          {/* )} */}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}

export default Main;