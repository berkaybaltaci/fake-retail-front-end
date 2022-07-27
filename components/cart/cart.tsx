import { List } from '@mantine/core';
import { useCartContext } from '../../lib/context-store';
import { CircleMinus } from 'tabler-icons-react';

const Cart: React.FC = () => {
  const { products, removeProductFromCart } = useCartContext();

  return (
    <List>
      {products.map((item) => (
        <List.Item
          key={item._id}
          icon={
            <CircleMinus
              color="blue"
              onClick={() => removeProductFromCart(item)}
              style={{ cursor: 'pointer' }}
            />
          }
        >
          {item.name}
        </List.Item>
      ))}
    </List>
  );
};

export default Cart;
