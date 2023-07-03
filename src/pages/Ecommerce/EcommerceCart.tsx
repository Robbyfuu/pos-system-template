import React from "react";

import { Link } from "react-router-dom";
import { IProduct } from "@/src/Interfaces";
import { useDispatch } from "react-redux";
//Import actions
import {
  removeProductFromCart,
  updateQuantityAdd,
  updateQuantitySub,
  removeAllProductsFromCart,
} from "@/src/store/cart/cart.reducer";
import { addPreOrden } from "@/src/store/e-commerce/reducer";

import { moneyFormatter } from "@/src/common/functions";
interface PropsCart {
  cartItem: IProduct[];
}

const EcommerceCart: React.FC<PropsCart> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const grandTotal = cartItem.map(
    (product) => product.productPrice * product.cartQuantity!
  );

  const totalPrice = grandTotal.reduce((a, b) => a + b, 0);
  const handleRemoveFromCart = (product: IProduct) => {
    dispatch(removeProductFromCart(product));
  };
  const handleUpdateQuantityAdd = (product: IProduct) => {
    dispatch(updateQuantityAdd(product));
  };
  const handleUpdateQuantitySub = (product: IProduct) => {
    dispatch(updateQuantitySub(product));
  };
  const handleRemoveAllFromCart = () => {
    dispatch(removeAllProductsFromCart());
  };
  return (
    <React.Fragment>
      <div className="HeaderCart">
        <h3 className="HeadingCart"></h3>
        <h5
          className="ActionCart"
          onClick={() => {
            handleRemoveAllFromCart();
          }}
        >
          {" "}
          Vaciar Carro
        </h5>
      </div>

      {cartItem.map((product) => (
        <React.Fragment key={product.id}>
          <div className="Cart-Items">
            <div className="image-boxCart">
              <img src={product.productImage} style={{ height: "120px" }} />
            </div>
            <div className="aboutCart">
              <h1 className="titleCart"> {product.productName} </h1>
              <h3 className="subtitleCart"> {product.productCategory} </h3>
            </div>
            <div className="counterCart">
              <div
                className="btnCart"
                onClick={() => {
                  handleUpdateQuantitySub(product);
                }}
              >
                -
              </div>
              <div className="countCart">
                { product.productUnit === 'kg'? product.cartQuantity?.toFixed(2): product.cartQuantity}
                {" "}
                {product.productUnit}
              </div>
              <div
                className="btnCart"
                onClick={() => {
                  handleUpdateQuantityAdd(product);
                }}
              >
                +
              </div>
            </div>
            <div className="pricesCart">
              <div className="amountCart">
                {" "}
                {moneyFormatter(
                  product.cartQuantity! * product.productPrice,
                  "$"
                )}
              </div>
              <div
                className="removeCart"
                onClick={() => handleRemoveFromCart(product)}
              >
                <u>
                  <i className="mdi mdi-trash-can font-size-18" />
                </u>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}

      <div className="checkoutCart">
        <div className="totalCart">
          <div>
            <div className="SubtotalCart">Total</div>
            <div className="itemsCart">{`${cartItem.length} productos`}</div>
          </div>
          <div className="total-amountCart">
            {moneyFormatter(totalPrice, "$")}
          </div>
        </div>
        <Link to={"/ecommerce-checkout"} className="btn btn-success mt-2" onClick={()=> dispatch(addPreOrden({cartItem,totalPrice}))}>
          Checkout
        </Link>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCart;
