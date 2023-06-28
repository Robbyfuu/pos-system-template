
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productsPagination: [],
  orders: [],
  error: {},
  loading: false,
  pagination: {
    limit: 9,
    offset: 0,
    pageActual: 1,
  }
};

const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    getProducts (state) {
      state.loading = true;
    },
    getProductsSuccess(state, action) {
      state.products = action.payload;
      // state.productsPagination = action.payload
    },
    getProductsPagination(state, action) {
      const pageNumber = action.payload;
      const itemsPerPage = 9;
      const totalPages = Math.ceil(state.products.length / itemsPerPage);
      const validPageNumber = Math.max(1, Math.min(pageNumber, totalPages));
      const offset = (validPageNumber - 1) * itemsPerPage;
      const limit = offset + itemsPerPage;

      state.productsPagination = state.products.slice(offset, limit);
    },
    getProductsFail(state, action) {
      state.error = action.payload;
    },
    getOrders (state, _action) {
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
      // @ts-ignore
      state.orders.push(action.payload);
    },
    addOrderFail(state, action) {
      state.error = action.payload;
    },
    deleteOrderSuccess(state, action) {
      state.orders = state.orders.filter(
        // @ts-ignore
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
  getProductsPagination,
  getOrders,
  getOrdersSuccess,
  getOrdersFail,
  addOrderSuccess,
  addOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;