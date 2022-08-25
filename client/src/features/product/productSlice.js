import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  productsIsLoading: true,
  products: [],
  imgs: [],
  departments: [],
  singleProduct: null,
  lastPage: false,
};

export const getProducts = createAsyncThunk(
  'getProducts',
  async (val, thunkAPI) => {
    thunkAPI.dispatch(setProductsIsLoading('t'));
    let url = !val.department
      ? '/api/products'
      : `/api/products/${val.department}`;
    if (val.page) {
      url = url + `?page=${val.page}`;
    }
    try {
      const { data } = await axios.get(url);
      thunkAPI.dispatch(setProducts(data.data));
      thunkAPI.dispatch(setLastPage(data.lastPage));
      thunkAPI.dispatch(setProductsIsLoading());
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setProductsIsLoading());
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  'getSingleProduct',
  async (id, thunkAPI) => {
    thunkAPI.dispatch(setProductsIsLoading('t'));
    thunkAPI.dispatch(setSingleProduct(null));
    try {
      const { data } = await axios.get(`/api/products/product/${id}`);
      thunkAPI.dispatch(setSingleProduct(data));
      thunkAPI.dispatch(setProductsIsLoading());
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setProductsIsLoading());
    }
  }
);

export const getProductImgs = createAsyncThunk(
  'getProductPics',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setProductsIsLoading('t'));

    try {
      const { data } = await axios.get('/api/products/images');

      thunkAPI.dispatch(setProductImgs(data));
      thunkAPI.dispatch(setProductsIsLoading());
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setProductsIsLoading());
    }
  }
);

export const getDepartments = createAsyncThunk(
  'getDepartments',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/products/departments');
      thunkAPI.dispatch(setDepartments(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    setProductsIsLoading: (state, { payload }) => {
      if (payload === 't') {
        state.productsIsLoading = true;
      } else {
        state.productsIsLoading = false;
      }
    },
    setSingleProduct: (state, { payload }) => {
      state.singleProduct = payload;
    },
    setProductImgs: (state, { payload }) => {
      state.imgs = payload;
    },
    setDepartments: (state, { payload }) => {
      state.departments = payload;
    },
    setLastPage: (state, { payload }) => {
      state.lastPage = payload;
    },
  },
});

export const {
  setProductsIsLoading,
  setProducts,
  setSingleProduct,
  setProductImgs,
  setDepartments,
  setLastPage,
} = productSlice.actions;

export default productSlice.reducer;
