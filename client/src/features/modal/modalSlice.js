import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModal: false,
  isModalLoading: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.isModal = true;
    },
    hideModal: (state) => {
      state.isModal = false;
    },
    setIsModalLoading: (state) => {
      state.isModalLoading = !state.isModalLoading;
    },
  },
});

export const { showModal, hideModal, setIsModalLoading } = modalSlice.actions;

export default modalSlice.reducer;
