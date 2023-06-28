// import { call, put, takeEvery } from "redux-saga/effects";

// import { getProducts } from "@/src/helpers/fakebackend_helper";
// import { getProductsSuccess, getProductsFail, getProducts as actionGetProduct } from "./reducer";

// // Ecommerce Redux States
// import {
//   GET_CART_DATA,
//   GET_CUSTOMERS,
//   GET_ORDERS,
//   GET_PRODUCT_DETAIL,
//   GET_PRODUCTS,
//   GET_SHOPS,
//   ADD_NEW_ORDER,
//   DELETE_ORDER,
//   UPDATE_ORDER,
//   ADD_NEW_CUSTOMER,
//   DELETE_CUSTOMER,
//   UPDATE_CUSTOMER,
//   GET_PRODUCT_COMMENTS,
//   ON_LIKE_COMMENT,
//   ON_LIKE_REPLY,
//   ON_ADD_REPLY,
//   ON_ADD_COMMENT,
// } from "./actionTypes";
// import {
//   getCartDataFail,
//   getCartDataSuccess,
//   getCustomersFail,
//   getCustomersSuccess,
//   getOrdersFail,
//   getOrdersSuccess,
//   getProductDetailFail,
//   getProductDetailSuccess,
//   getProductsFail,
//   getProductsSuccess,
//   getShopsFail,
//   getShopsSuccess,
//   addOrderFail,
//   addOrderSuccess,
//   updateOrderSuccess,
//   updateOrderFail,
//   deleteOrderSuccess,
//   deleteOrderFail,
//   addCustomerFail,
//   addCustomerSuccess,
//   updateCustomerSuccess,
//   updateCustomerFail,
//   deleteCustomerSuccess,
//   deleteCustomerFail,
//   getProductCommentsSuccess,
//   getProductCommentsFail,
//   onLikeCommentSuccess,
//   onLikeCommentFail,
//   onLikeReplySuccess,
//   onLikeReplyFail,
//   onAddReplySuccess,
//   onAddReplyFail,
//   onAddCommentSuccess,
//   onAddCommentFail,
// } from "./actions";

// //Include Both Helper File with needed methods
// import {
//   getCartData,
//   getCustomers,
//   getOrders,
//   getProducts,
//   getShops,
//   getProductDetail,
//   addNewOrder,
//   updateOrder,
//   deleteOrder,
//   addNewCustomer,
//   updateCustomer,
//   deleteCustomer,
//   getProductComents as getProductComentsApi,
//   onLikeComment as onLikeCommentApi,
//   onLikeReply as onLikeReplyApi,
//   onAddReply as onAddReplyApi,
//   onAddComment as onAddCommentApi,
// } from "../../helpers/fakebackend_helper";

// function* fetchProducts() {
//   try {
//     const response:ResponseType = yield call(getProducts);
//     console.log(response)
//     yield put(getProductsSuccess(response));
//   } catch (error) {
//     yield put(getProductsFail(error));
//   }
// }


// function* fetchOrders() {
//   try {
//     const response = yield call(getOrders);
//     yield put(getOrdersSuccess(response));
//   } catch (error) {
//     yield put(getOrdersFail(error));
//   }
// }


// function* onUpdateOrder({ payload: order }) {
//   try {
//     const response = yield call(updateOrder, order);
//     yield put(updateOrderSuccess(response));
//   } catch (error) {
//     yield put(updateOrderFail(error));
//   }
// }

// function* onDeleteOrder({ payload: order }) {
//   try {
//     const response = yield call(deleteOrder, order);
//     yield put(deleteOrderSuccess(response));
//   } catch (error) {
//     yield put(deleteOrderFail(error));
//   }
// }

// function* onAddNewOrder({ payload: order }) {
//   try {
//     const response = yield call(addNewOrder, order);
//     yield put(addOrderSuccess(response));
//   } catch (error) {
//     yield put(addOrderFail(error));
//   }
// }

function* ecommerceSaga() {
  // yield takeEvery(actionGetProduct, fetchProducts);
  // yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail);
  // yield takeEvery(GET_ORDERS, fetchOrders);
  // yield takeEvery(GET_CART_DATA, fetchCartData);
  // yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  // yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer);
  // yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  // yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
  // yield takeEvery(GET_SHOPS, fetchShops);
  // yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  // yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  // yield takeEvery(DELETE_ORDER, onDeleteOrder);
  // yield takeEvery(GET_PRODUCT_COMMENTS, getProductComents);
  // yield takeEvery(ON_LIKE_COMMENT, onLikeComment);
  // yield takeEvery(ON_LIKE_REPLY, onLikeReply);
  // yield takeEvery(ON_ADD_REPLY, onAddReply);
  // yield takeEvery(ON_ADD_COMMENT, onAddComment);
}

export default ecommerceSaga;
