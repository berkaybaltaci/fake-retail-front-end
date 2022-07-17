import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../types/IProduct';

import type { AppState } from './store';

export interface CartState {
  value: IProduct[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState = {
  value: [],
  status: 'idle',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addProductToCart } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCart = (state: AppState) => state.cart.value;

export default cartSlice.reducer;
