import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
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
  Label,
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
import { isEmpty, map } from "lodash";

//Import Product Images
import { productImages } from "@/src/assets/images/product";

//Import Breadcrumb
import Breadcrumbs from "@/src/components/Common/Breadcrumb";

//Urql
import { useQuerys } from "@/src/helpers/Apollo";

//Querys
import { productsQuery } from "@/src/helpers/Apollo/querys";

//Import actions
import { getProducts as onGetProducts,
  getProductsSuccess,
  getProductsFail,
} from "@/src/store/e-commerce/reducer";

//redux
import { useSelector, useDispatch } from "react-redux";

const EcommerceProducts = (props) => {
  //meta title
  document.title = "Products | Skote - Vite React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryResult = useQuerys(productsQuery);

  const { products } = useSelector((state) => ({
    products: state.ecommerce.products,
  }));

  const { history } = props;
  // eslint-disable-next-line no-unused-vars

  const [productList, setProductList] = useState<[]>();
  const [activeTab, setActiveTab] = useState("1");
  // eslint-disable-next-line no-unused-vars

  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(5);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    dispatch(onGetProducts());
    if (!queryResult.fetching && !queryResult.error && queryResult.data){
      dispatch(getProductsSuccess(queryResult.data.myPosts));
    }
    else if (queryResult.error) {
      dispatch(getProductsFail(queryResult.error));
    }
  }, [dispatch,queryResult]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
          <Row>
            <Col lg="7">
              <Row className="mb-3">
                <Col xl="4" sm="6">
                  <div className="mt-2">
                    <h5>Clothes</h5>
                  </div>
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
                            {product.isOffer ? (
                              <div className="avatar-sm product-ribbon">
                                <span className="avatar-title rounded-circle bg-primary">
                                  {`- ${product.offer} %`}
                                </span>
                              </div>
                            ) : null}

                            <img
                              src={productImages[product.image]}
                              alt=""
                              className="img-fluid mx-auto d-block"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <h5 className="mb-3 text-truncate">
                              <div className="text-dark">{product.name} </div>
                            </h5>
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
                              <b className="text-center">${product.newPrice}</b>
                            </div>
                          </div>
                            <Button
                              color="primary"
                              size="sm"
                              className="mt-2 me-1"
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
                    {map(Array(totalPage), (item, i) => (
                      <PaginationItem active={i + 1 === page} key={i}>
                        <PaginationLink
                          onClick={() => handlePageClick(i + 1)}
                          href="#"
                        >
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
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th colSpan="2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array(15)?.map(product => (
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
                                  to={"/ecommerce-product-detail/" + product.id}
                                  className="text-dark"
                                >
                                  {product.name}
                                </Link>
                              </h5>
                              <p className="mb-0">
                                Color :{" "}
                                <span className="fw-medium">
                                  {product.color}
                                </span>
                              </p>
                            </td>
                            <td>$ {product.price}</td>
                            <td>
                              <div style={{ width: "120px" }}>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      // onClick={() => {
                                      //   countUP(product.id, product.data_attr);
                                      // }}
                                      >+
                                    </button>
                                  </div>
                                  <Input
                                    type="text"
                                    value={product.data_attr}
                                    name="demo_vertical"
                                    readOnly
                                  />
                                  <div className="input-group-append">
                                    <button type="button" className="btn btn-primary"
                                      // onClick={() => {
                                      //   countDown(product.id, product.data_attr);
                                      // }}
                                      >-</button>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>$ {product.total}</td>
                            <td>
                              <Link
                                to="#"
                                // onClick={() => removeCartItem(product.id)}
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

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  history: PropTypes.object,
  onGetProducts: PropTypes.func,
};

export default withRouter(EcommerceProducts);
