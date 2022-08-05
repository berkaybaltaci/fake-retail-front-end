import { List, Text } from '@mantine/core';
import { useCartContext } from '../../lib/context-store';
import { CircleMinus, CirclePlus } from 'tabler-icons-react';
import { useCartStyles } from '../../styles/cart/cart.styles';
import React, { useState } from 'react';
import IProduct from '../../types/IProduct';
import {
  CART_ITEM_DECREASE_DELAY_MS,
  CART_ITEM_INCREASE_DELAY_MS,
  CART_ITEM_REMOVE_DELAY_MS,
} from '../../lib/constants';

const Cart: React.FC = () => {
  const { classes } = useCartStyles();
  const { products, removeProductFromCart, addProductToCart } =
    useCartContext();

  // States
  const [removingAnimationItemIds, setRemovingAnimationItemIds] = useState<
    string[]
  >([]);
  const [decreasingAnimationItemIds, setDecreasingAnimationItemIds] = useState<
    string[]
  >([]);
  const [increasingAnimationItemIds, setIncreasingAnimationItemIds] = useState<
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
      // Quantity is not dropping below 1, run decreasing animation
      setDecreasingAnimationItemIds((prevState: string[]) => {
        const newState = [...prevState, item._id];
        return newState;
      });
      setTimeout(() => {
        // Remove product after animation delay
        removeProductFromCart(item);

        // Animation is done playing, remove the product id from animation list
        setDecreasingAnimationItemIds((prevState: string[]) => {
          const newState = prevState.filter((id) => id !== item._id);
          return newState;
        });
      }, CART_ITEM_DECREASE_DELAY_MS);
    }
  };

  const plusClickHandler = (item: IProduct) => {
    setIncreasingAnimationItemIds((prevState: string[]) => {
      const newState = [...prevState, item._id];
      return newState;
    });
    setTimeout(() => {
      // Remove product after animation delay
      addProductToCart(item);

      // Animation is done playing, remove the product id from animation list
      setIncreasingAnimationItemIds((prevState: string[]) => {
        const newState = prevState.filter((id) => id !== item._id);
        return newState;
      });
    }, CART_ITEM_INCREASE_DELAY_MS);
  };

  return (
    <>
      {productsArray.length === 0 && (
        <Text weight={700} style={{ fontStyle: 'italic' }}>
          No products in cart.
        </Text>
      )}
      <List style={{ userSelect: 'none' }}>
        {productsArray.map((item) => (
          <List.Item
            key={item._id}
            className={
              removingAnimationItemIds.includes(item._id)
                ? classes.removing
                : decreasingAnimationItemIds.includes(item._id)
                ? classes.decreasing
                : increasingAnimationItemIds.includes(item._id)
                ? classes.increasing
                : ''
            }
            icon={[
              <CircleMinus
                key={item._id}
                onClick={() => minusClickHandler(item)}
                className={classes.minusIcon}
              />,
              <CirclePlus
                key={item._id}
                onClick={() => plusClickHandler(item)}
                className={classes.plusIcon}
              />,
            ]}
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
