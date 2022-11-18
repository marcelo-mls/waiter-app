import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface OrderConfirmedProps {
  visible: boolean;
  onOk: () => void;
}

function OrderConfirmedModal(props: OrderConfirmedProps) {
  const {visible, onOk} = props;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      // onRequestClose={onOk}
    >
      <StatusBar style="light" />
      <Container>
        <CheckCircle></CheckCircle>
        <Text size={20} weight="600" color="#fff" style={{marginTop: 12}}>
          Pedido Confirmado!
        </Text>

        <Text color="#fff" opacity={0.9} style={{marginTop: 4}}>
          O pedido já entrou na fila de produção
        </Text>

        <OkButton onPress={onOk}>
          <Text weight="600" color="#D73053">OK</Text>
        </OkButton>
      </Container>

    </Modal>
  );

}

export default OrderConfirmedModal;