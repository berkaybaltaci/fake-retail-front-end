import { List } from '@mantine/core';
import { useCartContext } from '../../lib/context-store';

const Cart: React.FC = () => {
  const { products } = useCartContext();

  return (
    <List>
      {products.map((item) => (
        <List.Item key={item._id}>{item.name}</List.Item>
      ))}
    </List>
  );
};

export default Cart;
