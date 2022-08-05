import { createContext, ReactNode, useContext, useState } from 'react';
import IProduct from '../types/IProduct';

interface ICartContext {
  products: Map<IProduct, number>;
  addProductToCart: (product: IProduct) => void;
  removeProductFromCart: (product: IProduct) => void;
  clearCart: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const cartContextDefaultValues: ICartContext = {
  products: new Map(),
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
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
  const [products, setProducts] = useState<Map<IProduct, number>>(
    new Map<IProduct, number>()
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>('');

  const addProductToCart = (product: IProduct) => {
    setProducts((prev: Map<IProduct, number>) => {
      const updatedCart = new Map<IProduct, number>(prev);
      let productAlreadyInCart: boolean = false;
      let productInCart: IProduct;

      // Check if user is increasing the quantity for a product already in cart
      updatedCart.forEach((quantity, curProduct) => {
        if (product._id === curProduct._id) {
          productAlreadyInCart = true;
          productInCart = curProduct;
        }
      });

      if (productAlreadyInCart) {
        // Product is already in cart, increase quantity
        let quantity = prev.get(productInCart!)!;
        quantity++;
        updatedCart.set(productInCart!, quantity);
      } else {
        // Add product and set quantity as 1
        updatedCart.set(product, 1);
      }
      return updatedCart;
    });
  };

  const removeProductFromCart = (product: IProduct) => {
    setProducts((prev: Map<IProduct, number>) => {
      const updatedCart = new Map<IProduct, number>(prev);
      if (prev.get(product) === 1) {
        updatedCart.delete(product);
      } else {
        let quantity = prev.get(product)!;
        quantity--;
        updatedCart.set(product, quantity);
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setProducts(() => {
      const updatedCart = new Map();
      return updatedCart;
    });
  };

  const value = {
    products,
    addProductToCart,
    removeProductFromCart,
    clearCart,
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
