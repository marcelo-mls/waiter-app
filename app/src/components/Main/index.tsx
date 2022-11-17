import Header from '../Header';
import Categories from '../Categories';
import Menu from '../Menu';
import Button from '../Button';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';

function Main() {
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
          <Button onPress={() => alert('teste')}>
            Novo Pedido
          </Button>
        </FooterContainer>
      </Footer>
    </>
  );
}

export default Main;