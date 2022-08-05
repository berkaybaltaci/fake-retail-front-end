import { List, Text } from '@mantine/core';
import { useCartContext } from '../../lib/context-store';
import { CircleMinus } from 'tabler-icons-react';
import { useCartStyles } from '../../styles/cart/cart.styles';
import React, { useState } from 'react';
import IProduct from '../../types/IProduct';
import { CART_ITEM_REMOVE_DELAY_MS } from '../../lib/constants';

const Cart: React.FC = () => {
  const { classes } = useCartStyles();
  const { products, removeProductFromCart } = useCartContext();

  const [removingAnimationItemIds, setRemovingAnimationItemIds] = useState<
    string[]
  >([]);

  // // Array of distinctive products
  const productsArray = Array.from(products.keys());

  const totalPrice = productsArray
    .reduce((total, item) => total + +item.price * products.get(item)!, 0)
    .toFixed(2);

  const minusClickHandler = (item: IProduct) => {
    if (products.get(item) === 1) {
      // Quantity drops to 0, run removing animation
      setRemovingAnimationItemIds((prevState: string[]) => {
        const newState = [...prevState, item._id];
        return newState;
      });
      setTimeout(() => {
        // Remove product after animation delay
        removeProductFromCart(item);

        // Animation is done playing, remove the product id from animation list
        setRemovingAnimationItemIds((prevState: string[]) => {
          const newState = prevState.filter((id) => id !== item._id);
          return newState;
        });
      }, CART_ITEM_REMOVE_DELAY_MS);
    } else {
      // Quantity is not dropping below 1, decrease without animation
      removeProductFromCart(item);
    }
  };

  return (
    <>
      {productsArray.length === 0 && (
        <Text weight={700} style={{ fontStyle: 'italic' }}>
          No products in cart.
        </Text>
      )}
      <List>
        {productsArray.map((item) => (
          <List.Item
            key={item._id}
            className={
              removingAnimationItemIds.includes(item._id)
                ? classes.removing
                : ''
            }
            icon={
              <CircleMinus
                onClick={() => minusClickHandler(item)}
                className={classes.minusIcon}
              />
            }
          >
            {products.get(item)}x {item.name}
          </List.Item>
        ))}
      </List>
      <Text color="blue" weight={700} style={{ textAlign: 'right' }}>
        Total: £{totalPrice}
      </Text>
    </>
  );
};

export default Cart;
