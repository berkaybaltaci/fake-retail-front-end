import { List } from '@mantine/core';
import { useCartContext } from '../../lib/context-store';
import { CircleMinus } from 'tabler-icons-react';
import { BUTTON_COLOR } from '../../lib/constants';
import { useCartStyles } from '../../styles/cart/cart.styles';

const Cart: React.FC = () => {
  const { products, removeProductFromCart } = useCartContext();

  const { classes } = useCartStyles();

  return (
    <List>
      {products.map((item) => (
        <List.Item
          key={item._id}
          icon={
            <CircleMinus
              onClick={() => removeProductFromCart(item)}
              className={classes.minusIcon}
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
