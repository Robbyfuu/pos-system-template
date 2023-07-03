import { IProduct } from "@/src/Interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface IEcommerceState {
  products: IProduct[];
  productsPagination: IProduct[];
  orders: IProduct[];
  preOrder: {
    cart: IProduct[];
    total: number;
  };
  error: {};
  loading: boolean;
  pagination: {
    limit: number;
    offset: number;
    pageActual: number;
  };
}
const initialState: IEcommerceState = {
  products: [],
  productsPagination: [],
  orders: [],
  preOrder: {
    cart: [],
    total: 0,
  },
  error: {},
  loading: false,
  pagination: {
    limit: 9,
    offset: 0,
    pageActual: 1,
  },
};
interface IPreOrder{
  cartItem: IProduct[],
  totalPrice: number
}

const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    getProducts(state) {
      state.loading = true;
    },
    getProductsSuccess(state, action) {
      state.products = action.payload.products;
      // state.productsPagination = action.payload.products;
      state.loading = false;
      //cargar los primeros 9 productos
      state.productsPagination = action.payload.products.slice(0, 9);
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
    getOrders(state, _action) {
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
        (order) => order.id.toString() !== action.payload.toString()
      );
    },
    deleteOrderFail(state, action) {
      state.error = action.payload;
    },
    addPreOrden(state, action) {
      const cartState = action.payload as IPreOrder;
      console.log(cartState)

      state.preOrder.cart =(cartState.cartItem)
      state.preOrder.total = cartState.totalPrice
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
  addPreOrden,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
