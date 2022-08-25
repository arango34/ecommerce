import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { removeCartItem } from '../cart/cartSlice';
import {
  addUserToSessionStorage,
  removeUserFromSessionStorage,
} from '../../utils';

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user) : null,
  users: [],
  token: token,
  isUserLoading: false,
  showAlert: false,
  alertText: '',
};

export const getUsers = createAsyncThunk('getUsers', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/api/users');
    thunkAPI.dispatch(setUsers(data));
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
});

export const login = createAsyncThunk('login', async (user, thunkAPI) => {
  thunkAPI.dispatch(setIsUserLoading());
  try {
    const { data } = await axios.post('/api/users/login', user);
    thunkAPI.dispatch(setUser(data.user));
    addUserToSessionStorage({ ...data });
    setTimeout(() => {
      thunkAPI.dispatch(setIsUserLoading());
    }, 1500);
  } catch (error) {
    const { msg } = error.response.data;
    thunkAPI.dispatch(setIsUserLoading());
    thunkAPI.dispatch(setAlertText(msg));
    thunkAPI.dispatch(setShowAlert());

    setTimeout(() => {
      thunkAPI.dispatch(setShowAlert());
      thunkAPI.dispatch(setAlertText(''));
    }, 2000);
  }
});

export const register = createAsyncThunk('register', async (user, thunkAPI) => {
  thunkAPI.dispatch(setIsUserLoading());
  try {
    const { data } = await axios.post('/api/users', user);
    data.name = { firsname: 'john', lastname: 'doe' };
    console.log(data);
    thunkAPI.dispatch(setUser(data));
    addUserToSessionStorage({ user: data });
    setTimeout(() => {
      thunkAPI.dispatch(setIsUserLoading());
    }, 1500);
  } catch (error) {
    const { msg } = error.response.data;
    thunkAPI.dispatch(setIsUserLoading());
    thunkAPI.dispatch(setAlertText(msg));
    thunkAPI.dispatch(setShowAlert());

    setTimeout(() => {
      thunkAPI.dispatch(setShowAlert());
      thunkAPI.dispatch(setAlertText(''));
    }, 2000);
  }
});

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  setTimeout(() => {
    thunkAPI.dispatch(removeCartItem());
    thunkAPI.dispatch(setUser(null));
    removeUserFromSessionStorage();
  }, 750);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsUserLoading: (state) => {
      state.isUserLoading = !state.isUserLoading;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setShowAlert: (state) => {
      state.showAlert = !state.showAlert;
    },
    setAlertText: (state, { payload }) => {
      state.alertText = payload;
    },
  },
});

export const {
  setIsUserLoading,
  setUser,
  setUsers,
  setShowAlert,
  setAlertText,
} = userSlice.actions;

export default userSlice.reducer;
