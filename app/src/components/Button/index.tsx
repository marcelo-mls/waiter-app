import { Container } from './styles';
import { Text } from '../Text';
import { ActivityIndicator } from 'react-native';

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

function Button(props: ButtonProps) {
  const { children, onPress, disabled, loading} = props;

  return (
    <Container
      onPress={onPress}
      disabled={disabled || loading}
    >
      {!loading && (
        <Text weight='600' color="#fff">
          { children }
        </Text>
      )}

      {loading && (
        <ActivityIndicator color="#fff"/>
      )}
    </Container>
  );
}

export default Button;