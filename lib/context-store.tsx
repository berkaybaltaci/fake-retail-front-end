import { createContext, ReactNode, useContext, useState } from 'react';
import IProduct from '../types/IProduct';

interface ICartContext {
  products: IProduct[];
  addProductToCart: (product: IProduct) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

const cartContextDefaultValues: ICartContext = {
  products: [],
  addProductToCart: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

const CartContext = createContext<ICartContext>(cartContextDefaultValues);

export function useCartContext() {
  return useContext(CartContext);
}

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const addProductToCart = (product: IProduct) => {
    setProducts((prev: IProduct[]) => {
      const updatedCart = [...prev, product];
      return updatedCart;
    });
  };

  const value = {
    products,
    addProductToCart,
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </>
  );
}
