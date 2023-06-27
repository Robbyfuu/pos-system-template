
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  orders: [],
  error: {},
  loading: false,
};

const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    getProducts (state) {
      state.loading = true;
    },
    getProductsSuccess(state, action) {
      console.log(action.payload)
      state.products = action.payload;
    },
    getProductsFail(state, action) {
      state.error = action.payload;
    },
    getOrders (state, action) {
      state.loading = true;
    },
    getOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    getOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addOrderSuccess(state, action) {
      state.orders.push(action.payload);
    },
    addOrderFail(state, action) {
      state.error = action.payload;
    },
    deleteOrderSuccess(state, action) {
      state.orders = state.orders.filter(
        order => order.id.toString() !== action.payload.toString()
      );
    },
    deleteOrderFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  getProducts,
  getProductsSuccess,
  getProductsFail,
  getOrders,
  getOrdersSuccess,
  getOrdersFail,
  addOrderSuccess,
  addOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;