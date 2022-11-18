import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Overlay, ModalBody, Header, Form, Input } from './styles';
import Button from '../Button';
import { useState } from 'react';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

function TableModal(props: TableModalProps) {
  const isAndroid = Platform.OS === 'android';

  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
    setTable('');
  }

  const { visible, onClose, onSave } = props;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >

      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <ModalBody>

          <Header>
            <Text weight='600'>Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666"/>
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={(value) => setTable(value)}
            />
            <Button
              onPress={handleSave}
              disabled={table.length === 0}
            >
              Salvar
            </Button>
          </Form>

        </ModalBody>
      </Overlay>

    </Modal>
  );
}

export default TableModal;