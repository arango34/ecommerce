import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setIsModalLoading, hideModal } from '../modal/modalSlice';

import {
  addCartItemsToSessionStorage,
  removeCartFromSessionStorage,
} from '../../utils';

let cartItems = sessionStorage.getItem('cart');

const initialState = {
  cartItems: cartItems ? JSON.parse(cartItems) : [],
  amount: 0,
  total: 0,
  isShowCart: false,
  isPurchaseFinal: false,
};

export const purchaseFinal = createAsyncThunk(
  'setPurchaseFinal',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setIsModalLoading());
    setTimeout(() => {
      thunkAPI.dispatch(setPurchaseFinal());
      thunkAPI.dispatch(setIsModalLoading());
    }, 2000);
  }
);

export const checkout = createAsyncThunk('checkout', async (_, thunkAPI) => {
  removeCartFromSessionStorage();
  thunkAPI.dispatch(removeCartItem());
  thunkAPI.dispatch(setShowCart());
  thunkAPI.dispatch(hideModal());
  thunkAPI.dispatch(setPurchaseFinal());
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, { payload }) => {
      let run = false;
      state.cartItems.forEach((item) => {
        if (item.id === payload.id) {
          item.amount += payload.amount;
          run = true;
        }
      });

      if (!run) {
        state.cartItems.push(payload);
      }

      addCartItemsToSessionStorage(state.cartItems);
    },
    removeCartItem: (state, { payload }) => {
      if (!payload) {
        state.cartItems = [];
        removeCartFromSessionStorage();
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== payload);

        if (state.cartItems.length === 0) {
          removeCartFromSessionStorage();
        } else {
          addCartItemsToSessionStorage(state.cartItems);
        }
      }
    },
    setShowCart: (state, { payload }) => {
      if (payload === 'f') {
        state.isShowCart = false;
      } else {
        state.isShowCart = !state.isShowCart;
      }
    },
    changeItemAmount: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (payload.operator === '+') {
        if (cartItem.amount === 10) return;
        cartItem.amount++;
      } else {
        if (cartItem.amount === 1) return;
        cartItem.amount--;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });

      state.amount = amount;
      state.total = total;
    },
    setPurchaseFinal: (state) => {
      state.isPurchaseFinal = !state.isPurchaseFinal;
    },
  },
});

export const {
  setShowCart,
  addCartItem,
  removeCartItem,
  changeItemAmount,
  calculateTotals,
  setPurchaseFinal,
} = cartSlice.actions;

export default cartSlice.reducer;
