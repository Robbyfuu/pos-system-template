import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import classnames from "classnames";
import {  isEmpty, map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "@/src/components/Common/Breadcrumb";

//Interfaces
import { IProduct, IStateCart, IStateProducts, ProductsProps } from "@/src/Interfaces";

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
import { addProductToCart, removeProductFromCart, updateQuantityAdd, updateQuantitySub } from "@/src/store/cart/cart.reducer";

//redux
import { useSelector, useDispatch } from "react-redux";

const EcommerceProducts: React.FC<ProductsProps> = (_props) => {
  //meta title
  document.title = "Products | Skote - Vite React Admin & Dashboard Template";

  const dispatch = useDispatch();
  
  let queryResult = useQuerys(productsQuery);
  const queryCountProducts = useQuerys(countProductsQuery);

  const { products } = useSelector((state: IStateProducts) => ({
    // products: state.ecommerce.products,
    products: state.ecommerce.productsPagination,
  }));
  const { cart } = useSelector ((state: IStateCart) =>({
    cart: state.Cart.cart
  }))
  // useStates
  const [productList, setProductList] = useState<IProduct[] | undefined>(
    undefined
  );
  const [cartItems, setCartItems] = useState<IProduct[] | undefined >(undefined);

  const [activeTab, setActiveTab] = useState("1");
  const [page, setPage] = useState(1);
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
  }
  , [cart]);


  useEffect(() => {
    dispatch(onGetProducts());
    if (
      queryResult &&
      !queryResult.fetching &&
      !queryResult.error &&
      queryResult.data
    ) {
      dispatch(getProductsSuccess(queryResult.data.products));
    } else if (queryResult && queryResult.error) {
      dispatch(getProductsFail(queryResult.error));
    }
  }, [queryResult]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [getProductsPagination]);

  useEffect(() => {
    dispatch(getProductsPagination(page));
  }, [page]);

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handlePageClick = (page: number) => {
    setPage(page);
    dispatch(getProductsPagination(page));
  };
  const handleAddToCart = (product: IProduct) => {
    dispatch(addProductToCart(product));
  };
  const handleRemoveFromCart = (product: IProduct) => {
    dispatch(removeProductFromCart(product));
  };
  const handleUpdateQuantityAdd = (product: IProduct) => {
    dispatch(updateQuantityAdd(product));
  };
  const handleUpdateQuantitySub = (product: IProduct) => {
    dispatch(updateQuantitySub(product));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Nombre Negocio" breadcrumbItem="Productos" />
          <Row>
            <Col lg="7">
              <Row className="mb-3">
                <Col xl="4" sm="6">
                  {/* <div className="mt-2">
                    <h5>Productos</h5>
                  </div> */}
                </Col>
                <Col lg="8" sm="6">
                  <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                    <div className="search-box me-2">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control border-0"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                    <Nav className="product-view-nav" pills>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1");
                          }}
                        >
                          <i className="bx bx-grid-alt" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggleTab("2");
                          }}
                        >
                          <i className="bx bx-list-ul" />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Form>
                </Col>
              </Row>
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
                                {`$ ${product.productPrice} ${product.productUnit}`}
                              </h5>
                            </div>
                            <div
                              className="input-group d-flex align-items-center justify-content-center mt-2"
                              style={{ gap: "10px" }}
                            >
                              <Input
                                type="text"
                                placeholder="Cantidad"
                                min={1}
                                defaultValue={1}
                                className="text-center" // Centrar el texto dentro del input
                              />
                              <div className="input-group-append">
                                <b className="text-center">
                                  ${product.productUnit}
                                </b>
                              </div>
                            </div>
                            <Button
                              color="primary"
                              size="sm"
                              className="mt-2 me-1"
                              onClick={() => handleAddToCart(product)}
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
            <Col lg="5">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Productos</CardTitle>
                  <Col lx="8">
                    <Card>
                      <CardBody>
                        <div className="table-responsive">
                          <Table className="table align-middle mb-0 table-nowrap">
                            <thead className="table-light">
                              <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th colSpan={2}>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartItems?.map((product) => (
                                <tr key={product.id}>
                                  {/* <td>
                              <img
                                src={product.img}
                                alt="product-img"
                                title="product-img"
                                className="avatar-md"
                              />
                            </td> */}
                                  <td>
                                    <h5 className="font-size-14 text-truncate">
                                      <Link
                                        to={
                                          "/ecommerce-product-detail/" +
                                          product.id
                                        }
                                        className="text-dark"
                                      >
                                        {product.productName}
                                      </Link>
                                    </h5>
                                    <p className="mb-0">
                                      Color :{" "}
                                      <span className="fw-medium">
                                        {product.productCategory}
                                      </span>
                                    </p>
                                  </td>
                                  <td>$ {product.productPrice}</td>
                                  <td>
                                    <div style={{ width: "120px" }}>
                                      <div className="input-group">
                                        <div className="input-group-prepend">
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                              handleUpdateQuantitySub(product)
                                            }}
                                          >
                                            -
                                          </button>
                                        </div>
                                        <Input
                                          type="text"
                                          value={product.cartQuantity}
                                          name="demo_vertical"
                                          readOnly
                                        />
                                        <div className="input-group-append">
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                              handleUpdateQuantityAdd(product)
                                            }}
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>$ {product.cartQuantity? product.cartQuantity*product.productPrice: 0}</td>
                                  <td>
                                    <Link
                                      to="#"
                                      onClick={() => handleRemoveFromCart(product)}
                                      className="action-icon text-danger"
                                    >
                                      {" "}
                                      <i className="mdi mdi-trash-can font-size-18" />
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                        <Row className="mt-4">
                          <Col sm="6">
                            <Link
                              to="/ecommerce-products"
                              className="btn btn-secondary"
                            >
                              <i className="mdi mdi-arrow-left me-1" /> Continue
                              Shopping{" "}
                            </Link>
                          </Col>
                          <Col sm="6">
                            <div className="text-sm-end mt-2 mt-sm-0">
                              <Link
                                to="/ecommerce-checkout"
                                className="btn btn-success"
                              >
                                <i className="mdi mdi-cart-arrow-right me-1" />{" "}
                                Checkout{" "}
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
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
