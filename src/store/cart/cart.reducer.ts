import { IStateCart } from "@/src/Interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface IProduct {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
    cartQuantity?: number;
    productUnit: string;
}


const initialState: IStateCart = {
  cart: [],
  loading: false,
  error: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity! += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
      }
    },
    removeProductFromCart: (state, action) => {
        const itemDeleteDefinitive = state.cart.findIndex(
            item => item.productId === action.payload.productId
          )
          state.cart.splice(itemDeleteDefinitive, 1)
    },
    updateQuantityAdd: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity! += 1;
      } else {
        state.error = "Error al actualizar la cantidad";
      }
    },
    updateQuantitySub: (state, action) => {
      const itemDelete = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      const cartDataMap = state.cart.map(
        (product) => product.cartQuantity
      );
      if (cartDataMap[itemDelete]! >= 1) {
        state.cart[itemDelete].cartQuantity! -= 1;
      } else {
        state.cart.splice(itemDelete, 1);
      }
    },
  },
});

export const { addProductToCart, removeProductFromCart, updateQuantityAdd, updateQuantitySub } = cartSlice.actions;

export default cartSlice.reducer;
