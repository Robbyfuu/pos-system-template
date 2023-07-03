import { IProduct } from "@/src/Interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface ICart {
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
        (item) => item.id === action.payload.product.id
      );

      if (action.payload.product.productUnit === "kg") {
        if (itemIndex >= 0) {
          console.log(state.cart[itemIndex].cartQuantity!);
          console.log(action.payload.quantity);
          state.cart[itemIndex].cartQuantity! += action.payload.quantity;
        } else {
          const tempProduct = {
            ...action.payload.product,
            cartQuantity: action.payload.quantity,
          };
          state.cart.push(tempProduct);
        }
      } else {
        if (itemIndex >= 0) {
          state.cart[itemIndex].cartQuantity! += action.payload.quantity;
        } else {
          if (action.payload.quantity > 1) {
            const tempProduct = {
              ...action.payload.product,
              cartQuantity: action.payload.quantity,
            };
            state.cart.push(tempProduct);
          } else {
            const tempProduct = { ...action.payload.product, cartQuantity: 1 };
            state.cart.push(tempProduct);
          }
        }
      }
    },
    removeProductFromCart: (state, action) => {
      const itemDeleteDefinitive = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cart.splice(itemDeleteDefinitive, 1);
    },
    removeAllProductsFromCart: (state) => {
      state.cart = [];
    },
    updateQuantityAdd: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        if (action.payload.productUnit === "kg") {
          state.cart[itemIndex].cartQuantity! += 0.1;
        } else {
          state.cart[itemIndex].cartQuantity! += 1;
        }
      } else {
        state.error = "Error al actualizar la cantidad";
      }
    },
    updateQuantitySub: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.cart.findIndex((item) => item.id === itemId);
      if (action.payload.productUnit === "kg") {
        if (itemIndex !== -1) {
          const currentItem = state.cart[itemIndex];
          const updatedQuantity = currentItem.cartQuantity! - 0.1;

          if (updatedQuantity <= 0) {
            state.cart.splice(itemIndex, 1);
          } else {
            state.cart[itemIndex] = {
              ...currentItem,
              cartQuantity: updatedQuantity,
            };
          }
        }
      } else {
        if (itemIndex !== -1) {
          const currentItem = state.cart[itemIndex];
          const updatedQuantity = currentItem.cartQuantity! - 1;

          if (updatedQuantity <= 0) {
            state.cart.splice(itemIndex, 1);
          } else {
            state.cart[itemIndex] = {
              ...currentItem,
              cartQuantity: updatedQuantity,
            };
          }
        }
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateQuantityAdd,
  updateQuantitySub,
  removeAllProductsFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
