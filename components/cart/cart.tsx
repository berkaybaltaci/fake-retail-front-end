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

  const productsMap = new Map<IProduct, number>(); // {product: quantity}

  for (let product of products) {
    const currentProductsInMap = Array.from(productsMap.keys());

    let isItemAlreadyInMap = false;
    let quantity: number;
    let foundProductInMap: IProduct;
    for (let curProduct of currentProductsInMap) {
      if (product._id === curProduct._id) {
        isItemAlreadyInMap = true;
        foundProductInMap = curProduct;
        quantity = productsMap.get(curProduct)!;
        break;
      }
    }
    if (isItemAlreadyInMap) {
      // Increment the quantity and set it as the new value
      quantity!++;
      productsMap.set(foundProductInMap!, quantity!);
    } else {
      // Add product to the map
      productsMap.set(product, 1);
    }
  }

  // Array of distinctive products
  const adjustedProducts = Array.from(productsMap.keys());

  const [removingItemIds, setRemovingItemIds] = useState<string[]>([]);

  const totalPrice = products
    .reduce((total, item) => total + +item.price, 0)
    .toFixed(2);

  const minusClickHandler = (item: IProduct) => {
    // If quantity drops to 0, run removing animation
    if (productsMap.get(item) === 1) {
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
    } else {
      removeProductFromCart(item);
    }
  };

  return (
    <>
      <List>
        {adjustedProducts.map((item) => (
          <List.Item
            key={item._id}
            className={
              removingItemIds.includes(item._id) ? classes.removing : ''
            }
            icon={
              <CircleMinus
                onClick={() => minusClickHandler(item)}
                className={classes.minusIcon}
              />
            }
          >
            {productsMap.get(item)}x {item.name}
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
