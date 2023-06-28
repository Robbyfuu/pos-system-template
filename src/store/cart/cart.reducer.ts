import { IProduct } from "@/src/Interfaces";
import { createSlice } from "@reduxjs/toolkit";



interface ICart{
  cart: IProduct[];
  loading?: boolean;
  error?: string;
}
const initialState: ICart = {
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
        (item) => item.id === action.payload.id
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
            item => item.id === action.payload.id
          )
          state.cart.splice(itemDeleteDefinitive, 1)
    },
    updateQuantityAdd: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity! += 1;
      } else {
        state.error = "Error al actualizar la cantidad";
      }
    },
    updateQuantitySub: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.cart.findIndex(item => item.id === itemId);
    
      if (itemIndex !== -1) {
        const currentItem = state.cart[itemIndex];
        const updatedQuantity = currentItem.cartQuantity! - 1;
    
        if (updatedQuantity <= 0) {
          state.cart.splice(itemIndex, 1);
        } else {
          state.cart[itemIndex] = {
            ...currentItem,
            cartQuantity: updatedQuantity
          };
        }
      }
    },
  },
});

export const { addProductToCart, removeProductFromCart, updateQuantityAdd, updateQuantitySub } = cartSlice.actions;

export default cartSlice.reducer;
