import { Container } from './styles';
import { Text } from '../Text';

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const { children, onPress, disabled} = props;

  return (
    <Container
      onPress={onPress}
      disabled={disabled}
    >
      <Text weight='600' color="#fff">
        { children }
      </Text>
    </Container>
  );
}

export default Button;