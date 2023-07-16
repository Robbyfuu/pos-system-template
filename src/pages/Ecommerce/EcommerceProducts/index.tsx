import React, { useEffect, useState } from "react";
import withRouter from "../../../components/Common/withRouter";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
// import classnames from "classnames";
import { isEmpty, map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "@/src/components/Common/Breadcrumb";

//Interfaces
import {
  IProduct,
  IStateCart,
  IStateProducts,
  ProductsProps,
} from "@/src/Interfaces";

//Urql
import { useQuerys } from "@/src/helpers/Apollo";

//Querys
import { countProductsQuery, productsQuery } from "@/src/helpers/Apollo/querys";

//Import actions
import {
  getProducts as onGetProducts,
  getProductsPagination,
  getProductsSuccess,
  getProductsFail,
} from "@/src/store/e-commerce/reducer";
import {
  addProductToCart,
  // removeProductFromCart,
  // updateQuantityAdd,
  // updateQuantitySub,
} from "@/src/store/cart/cart.reducer";

//redux
import { useSelector, useDispatch } from "react-redux";
import EcommerceCart from "../EcommerceCart";
import { moneyFormatter } from "@/src/common/functions";

const EcommerceProducts: React.FC<ProductsProps> = (_props) => {
  //meta title
  document.title = "Productos | Punto de Ventas";

  const dispatch = useDispatch();

  const queryCountProducts = useQuerys(countProductsQuery);

  const { products } = useSelector((state: IStateProducts) => ({
    // products: state.ecommerce.products,
    products: state.ecommerce.productsPagination,
  }));
  const { cart } = useSelector((state: IStateCart) => ({
    cart: state.Cart.cart,
  }));
  // useStates
  const [productList, setProductList] = useState<IProduct[] | undefined>(
    undefined
  );
  const [cartItems, setCartItems] = useState<IProduct[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [itemQuantity, setItemQuantity] = useState<number | undefined>();

  const totalPage = queryCountProducts?.data
    ? Math.ceil(queryCountProducts?.data.countProducts / 9)
    : 0;

  useEffect(() => {
    if (products) {
      setProductList(products);
    }
  }, [products]);
  useEffect(() => {
    if (cart) {
      setCartItems(cart);
    }
  }, [cart]);

  const queryResult = useQuerys(productsQuery);
  useEffect(() => {
    if (queryResult && queryResult.data !== undefined) {
      dispatch(onGetProducts());

      if (!queryResult.fetching && !queryResult.error) {
        dispatch(
          getProductsSuccess({ products: queryResult.data.products, page })
        );
      } else if (queryResult.error) {
        dispatch(getProductsFail(queryResult.error));
      }
    }
  }, [queryResult?.data]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [getProductsPagination]);

  useEffect(() => {
    dispatch(getProductsPagination(page));
  }, [page]);

  const handleInputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setItemQuantity(Number(e.target.value));
  };

  const handlePageClick = (page: number) => {
    setPage(page);
    dispatch(getProductsPagination(page));
  };
  const handleAddToCart = (product: IProduct, quantity: number) => {
    dispatch(addProductToCart({ product, quantity }));
    setItemQuantity(0);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Nombre Negocio" breadcrumbItem="Productos" />
          <Row>
            <Col lg="6">
              <Row>
                {!isEmpty(productList) &&
                  productList?.map((product, key) => (
                    <Col xl="4" sm="6" key={"_col_" + key}>
                      <Card>
                        <CardBody>
                          <div className="product-img position-relative">
                            <img
                              src={product.productImage}
                              alt=""
                              className="img-fluid mx-auto d-block"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <h5 className="mb-3 text-truncate">
                              <div className="text-dark">
                                {product.productName}{" "}
                              </div>
                            </h5>
                            <div className="mb-3">
                              <h5 className="text-truncate">
                                {`${moneyFormatter(
                                  product.productPrice,
                                  "$"
                                )} ${
                                  product.productUnit === "kg"
                                    ? "/ kg"
                                    : ` / unidad`
                                }`}
                              </h5>
                            </div>
                            <div
                              className="input-group d-flex align-items-center justify-content-center mt-2"
                              style={{ gap: "10px" }}
                            >
                              <Input
                                type="text"
                                placeholder="Cantidad"
                                min={0}
                                defaultValue={itemQuantity}
                                className="text-center"
                                style={{
                                  textAlign: "center",
                                  borderRadius: "5px",
                                }}
                                onChange={(e) => handleInputQuantity(e)} // Centrar el texto dentro del input
                              />
                              <div className="input-group-append">
                                <b className="text-center">
                                  {product.productUnit}
                                </b>
                              </div>
                            </div>
                            <Button
                              color="primary"
                              size="sm"
                              className="mt-2 me-1"
                              onClick={() =>
                                handleAddToCart(product, itemQuantity!)
                              }
                            >
                              Agregar
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </Row>

              <Row>
                <Col lg="12">
                  <Pagination className="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1">
                    <PaginationItem disabled={page === 1}>
                      <PaginationLink
                        previous
                        href="#"
                        onClick={() => handlePageClick(page - 1)}
                      />
                    </PaginationItem>
                    {map(Array(totalPage), (_item, i) => (
                      <PaginationItem active={i + 1 === page} key={i}>
                        <PaginationLink onClick={() => handlePageClick(i + 1)}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={page === totalPage}>
                      <PaginationLink
                        next
                        href="#"
                        onClick={() => handlePageClick(page + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </Col>
            <Col lg="6">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Detalle de Productos</CardTitle>
                  <EcommerceCart cartItem={cartItems || []} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EcommerceProducts);
