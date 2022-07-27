import { createContext, ReactNode, useContext, useState } from 'react';
import IProduct from '../types/IProduct';

interface ICartContext {
  products: IProduct[];
  addProductToCart: (product: IProduct) => void;
  removeProductFromCart: (product: IProduct) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const cartContextDefaultValues: ICartContext = {
  products: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  activeLink: '',
  setActiveLink: () => {},
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
  const [activeLink, setActiveLink] = useState<string>('');

  const addProductToCart = (product: IProduct) => {
    setProducts((prev: IProduct[]) => {
      const updatedCart = [...prev, product];
      return updatedCart;
    });
  };

  const removeProductFromCart = (product: IProduct) => {
    setProducts((prev: IProduct[]) => {
      const updatedCart = prev.filter((item) => item !== product);
      return updatedCart;
    });
  };

  const value = {
    products,
    addProductToCart,
    removeProductFromCart,
    isLoggedIn,
    setIsLoggedIn,
    activeLink,
    setActiveLink,
  };
  return (
    <>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </>
  );
}
