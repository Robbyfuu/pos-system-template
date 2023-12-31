import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import classnames from "classnames";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  addOrderSuccess,
  addOrder,
  addOrderFail,
} from "@/src/store/e-commerce/reducer";
//GraphQL
import { useMutation } from "urql";
import { orderCreateMutation } from "@/src/helpers/Apollo/querys";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { moneyFormatter } from "@/src/common/functions";
import { IStateProducts } from "@/src/Interfaces";
import withRouter from "@/src/components/Common/withRouter";

import { CheckoutProps } from "@/src/Interfaces";

const EcommerceCheckout: React.FC<CheckoutProps> = (prop) => {
  //meta title
  document.title = "Checkout | Punto de Ventas";
  const dispatch = useDispatch();
  const [activeTab, setactiveTab] = useState("1");
  const [selectPayment, setSelectPayment] = useState<string | undefined>("1");
  const [moneyCash, setMoneyCash] = useState<string>("");
  const [changeMoney, setChangeMoney] = useState<number>(0);
  const [operationNumber, setOperationNumber] = useState<string>("");
  const [disbleButtonConfirm, setDisbleButtonConfirm] = useState<boolean>();
  const [_result, executeMutation] = useMutation(orderCreateMutation);

  const { cartItems, totalAmount } = useSelector((state: IStateProducts) => ({
    cartItems: state.ecommerce.preOrder.cart,
    totalAmount: state.ecommerce.preOrder.total,
  }));
  const numberFormatter = (text: string) => {
    return text.replaceAll(".", "");
  };
  React.useEffect(() => {
    const parseMoneyCash = parseInt(
      numberFormatter(
        moneyCash.slice(moneyCash.lastIndexOf("$") + 1, moneyCash.length)
      )
    );
    setChangeMoney(parseMoneyCash - totalAmount);
  }, [moneyCash]);
  React.useEffect(() => {
    if (changeMoney >= 0 || operationNumber.length > 0) {
      setDisbleButtonConfirm(false);
    } else {
      setDisbleButtonConfirm(true);
    }
  }, [changeMoney, operationNumber]);

  const handleCreateOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addOrder());
    const products = cartItems.map((item) => {
      return {
        id: item.id,
        cartQuantity: parseFloat(item.cartQuantity?.toFixed(3)!),
      };
    });
    console.log({ products });
    const order = {
      createOrderInput: {
        paymentMethod: selectPayment === "1" ? "debito/credito" : "efectivo",
        total: Math.round(totalAmount),
        products: products,
      },
    };
    await executeMutation(order).then((result) => {
      if (result.error) {
        dispatch(addOrderFail(result.error.message));
      } else {
        console.log("result", result);
        dispatch(addOrderSuccess({navigate:prop.router.navigate}));
      }
    });
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Checkout" />

          <div className="checkout-tabs">
            <Row>
              <Col xl="2" sm="3">
                <Nav className="flex-column" pills>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        setactiveTab("1");
                      }}
                    >
                      <i className="bx bx-money d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">Pago</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        setactiveTab("2");
                      }}
                      disabled
                    >
                      <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">Confirmación</p>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col xl="10" sm="9">
                <Card>
                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane
                        tabId="1"
                        id="v-pills-payment"
                        role="tabpanel"
                        aria-labelledby="v-pills-payment-tab"
                      >
                        <div>
                          <CardTitle>Información de Pago</CardTitle>
                          <p className="card-title-desc">
                            Completa los datos de pago
                          </p>
                          <div>
                            <div className="form-check form-check-inline font-size-16">
                              <Input
                                type="radio"
                                value="1"
                                id="customRadioInline1"
                                name="customRadioInline1"
                                className="form-check-input"
                                onChange={(e) => {
                                  setSelectPayment(e.target.value);
                                }}
                                defaultChecked
                              />
                              <Label
                                className="form-check-label font-size-13"
                                htmlFor="customRadioInline1"
                              >
                                <i className="fab fa-cc-mastercard me-1 font-size-20 align-top" />{" "}
                                Tajeta de Credito / Debito
                              </Label>
                            </div>
                            <div className="form-check form-check-inline font-size-16">
                              <Input
                                type="radio"
                                value="2"
                                id="customRadioInline2"
                                name="customRadioInline1"
                                className="form-check-input"
                                onChange={(e) => {
                                  setSelectPayment(e.target.value);
                                }}
                              />
                              <Label
                                className="form-check-label font-size-13"
                                htmlFor="customRadioInline3"
                              >
                                <i className="far fa-money-bill-alt me-1 font-size-20 align-top" />{" "}
                                Efectivo
                              </Label>
                            </div>
                          </div>
                          {selectPayment === "1" ? (
                            <div className="p-4 border">
                              <Form>
                                <FormGroup className="mb-0">
                                  <Label htmlFor="cardnumberInput">
                                    Número de Operación
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="cardnumberInput"
                                    placeholder="000000"
                                    value={operationNumber}
                                    onChange={(e) => {
                                      setOperationNumber(e.target.value);
                                    }}
                                  />
                                </FormGroup>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup className="mt-4 mb-0">
                                      <Label htmlFor="cardnameInput">
                                        Monto
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="cardnameInput"
                                        placeholder="Name on Card"
                                        value={moneyFormatter(totalAmount, "$")}
                                        disabled
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="3">
                                    {/* <FormGroup className=" mt-4 mb-0">
                                      <Label htmlFor="expirydateInput">
                                        Expiry date
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="expirydateInput"
                                        placeholder="MM/YY"
                                      />
                                    </FormGroup> */}
                                  </Col>
                                  <Col lg="3">
                                    {/* <FormGroup className="mt-4 mb-0">
                                      <Label htmlFor="cvvcodeInput">
                                        CVV Code
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="cvvcodeInput"
                                        placeholder="Enter CVV Code"
                                      />
                                    </FormGroup> */}
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          ) : (
                            <div className="p-4 border">
                              <Form>
                                <FormGroup className="mb-0">
                                  <Label htmlFor="cardnumberInput">
                                    Ingrese el Monto en Efectivo
                                  </Label>
                                  <NumericFormat
                                    className="form-control"
                                    id="cardnumberInput"
                                    placeholder="Ingrese el Monto en Efectivo"
                                    type="text"
                                    prefix="$"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    value={moneyCash}
                                    onChange={(e) => {
                                      setMoneyCash(e.target.value);
                                    }}
                                  />
                                </FormGroup>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup className="mt-4 mb-0">
                                      <Label htmlFor="cardnameInput">
                                        Monto
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="cardnameInput"
                                        placeholder="Name on Card"
                                        value={moneyFormatter(totalAmount, "$")}
                                        disabled
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="3">
                                    <FormGroup className=" mt-4 mb-0">
                                      <Label htmlFor="expirydateInput">
                                        Vuelto
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="expirydateInput"
                                        placeholder="0000"
                                        value={
                                          changeMoney >= 0
                                            ? moneyFormatter(changeMoney, "$")
                                            : "$0"
                                        }
                                        disabled
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="3">
                                    {/* <FormGroup className="mt-4 mb-0">
                                      <Label htmlFor="cvvcodeInput">
                                        CVV Code
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="cvvcodeInput"
                                        placeholder="Enter CVV Code"
                                      />
                                    </FormGroup> */}
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          )}

                          <div
                            className="d-flex mt-2"
                            style={{ justifyContent: "flex-end" }}
                          >
                            <Button
                              color="primary"
                              onClick={() => setactiveTab("2")}
                              disabled={disbleButtonConfirm}
                            >
                              Continuar con la confirmación
                            </Button>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId="2" id="v-pills-confir" role="tabpanel">
                        <Card className="shadow-none border mb-0">
                          <CardBody>
                            <CardTitle className="mb-4">
                              Resumen de Orden
                            </CardTitle>

                            {cartItems.map((product) => (
                              <React.Fragment key={product.id}>
                                <div className="Cart-Items">
                                  <div className="image-boxCart">
                                    <img
                                      src={product.productImage}
                                      style={{ height: "120px" }}
                                    />
                                  </div>
                                  <div className="aboutCart">
                                    <h1 className="titleCart">
                                      {" "}
                                      {product.productName}{" "}
                                    </h1>
                                    <h3 className="subtitleCart">
                                      {" "}
                                      {product.productCategory}{" "}
                                    </h3>
                                  </div>
                                  <div className="counterCart">
                                    <div className="countCart">
                                      {product.productUnit === "kg"
                                        ? product.cartQuantity?.toFixed(2)
                                        : product.cartQuantity}{" "}
                                      {product.productUnit}
                                    </div>
                                  </div>
                                  <div className="pricesCart">
                                    <div className="amountCart">
                                      {" "}
                                      {moneyFormatter(
                                        product.cartQuantity! *
                                          product.productPrice,
                                        "$"
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </React.Fragment>
                            ))}
                          </CardBody>
                        </Card>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
                <Row className="mt-4">
                  <Col sm="6">
                    <Link
                      to="/ecommerce-products"
                      className="btn text-muted d-none d-sm-inline-block btn-link"
                    >
                      <i className="mdi mdi-arrow-left me-1" /> Back to Shopping
                      Cart{" "}
                    </Link>
                  </Col>
                  <Col sm="6">
                    <div className="text-sm-end">
                      {activeTab === "2" ? (
                        <Button

                          className="btn btn-success"
                          onClick={handleCreateOrder}
                        >
                          <i className="mdi mdi-truck-fast me-1" /> Confirmar
                          Compra
                        </Button>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EcommerceCheckout);
