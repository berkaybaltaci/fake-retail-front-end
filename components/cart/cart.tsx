import { List } from '@mantine/core';
import { useCartContext } from '../../lib/context-store';
import { CircleMinus } from 'tabler-icons-react';
import { useCartStyles } from '../../styles/cart/cart.styles';
import React, { useState } from 'react';
import IProduct from '../../types/IProduct';
import { CART_ITEM_REMOVE_DELAY_MS } from '../../lib/constants';

const Cart: React.FC = () => {
  const { products, removeProductFromCart } = useCartContext();
  const { classes } = useCartStyles();

  const [removingItemIds, setRemovingItemIds] = useState<string[]>([]);

  const minusClickHandler = (item: IProduct) => {
    setRemovingItemIds((prevState: string[]) => {
      const newState = [...prevState, item._id];
      return newState;
    });
    setTimeout(() => {
      removeProductFromCart(item);
      setRemovingItemIds((prevState: string[]) => {
        const newState = prevState.filter((id) => id !== item._id);
        return newState;
      });
    }, CART_ITEM_REMOVE_DELAY_MS);
  };

  return (
    <List>
      {products.map((item) => (
        <List.Item
          key={item._id}
          className={removingItemIds.includes(item._id) ? classes.removing : ''}
          icon={
            <CircleMinus
              onClick={() => minusClickHandler(item)}
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
