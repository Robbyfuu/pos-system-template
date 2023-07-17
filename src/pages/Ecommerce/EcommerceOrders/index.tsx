import React, { useEffect, useMemo, useState } from "react";

// import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../../components/Common/TableContainer";

//import components
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Row as RowType } from 'react-table';


import {
  OrderId,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
} from "./EcommerceOrderCol";

//redux
import { useSelector, useDispatch } from "react-redux";

import { useQuerys } from "@/src/helpers/Apollo";
import { ordersQuery } from "@/src/helpers/Apollo/querys";
import EcommerceOrdersModal from "./EcommerceOrdersModal";

import {
  Button,
  Col,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import {
  getOrders,
  getOrdersFail,
  getOrdersSuccess,
} from "@/src/store/e-commerce/reducer";

interface IOrder{
  seller:{
    firstName:string;
    lastName: string;
  }
}

function EcommerceOrder() {
  //meta title
  document.title = "Orders | Skote - Vite React Admin & Dashboard Template";

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  //@ts-ignore
  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState(null);

  const dispatch = useDispatch();

  const orderResult = useQuerys(ordersQuery);


  const toggleViewModal = (order? :any) => {
    setModal1(!modal1);
    setOrder(order);
  };

  const { orders } = useSelector((state) => ({
    //@ts-ignore
    orders: state.ecommerce.orders,
  }));

  useEffect(() => {
    if (orderResult && orderResult.data !== undefined) {
      dispatch(getOrders());
      if (!orderResult.fetching && !orderResult.error) {
        dispatch(getOrdersSuccess(orderResult.data.orders));
      } else if (orderResult.error) {
        dispatch(getOrdersFail(orderResult.error));
      }
    }
  }, [orderResult?.data]);
  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders);
      setIsEdit(false);
    }
  }, [orders]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };
  //@ts-ignore
  const handleOrderClick = (arg) => {
    const order = arg;

    setOrder({
      //@ts-ignore
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    });

    setIsEdit(true);

    toggle();
  };

  //delete order

  const handleOrderClicks = () => {
    setOrderList([]);
    setIsEdit(false);
    toggle();
  };
  console.log({ orders });

  const columns = useMemo(
    () => [
      {
        Header: "N° de Orden",
        accessor: "orderNumber",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: (cellProps: any) => {
          return <OrderId {...cellProps} />;
        },
      },
      {
        Header: "Vendedor",
        accessor: (row:IOrder) => `${row.seller.firstName} ${row.seller.lastName}`,
        filterable: true,
        Cell: (cellProps: any) => {
          return <PaymentStatus {...cellProps} />;
        },
      },
      {
        Header: "Fecha",
        accessor: "createdAt",
        filterable: true,
        Cell: (cellProps: any) => {
          return <Date {...cellProps} />;
        },
      },
      {
        Header: "Total",
        accessor: "total",
        filterable: true,
        Cell: (cellProps: any) => {
          return <Total {...cellProps} />;
        },
      },
      {
        Header: "Metodo de Pago",
        accessor: "paymentMethod",
        Cell: (cellProps: any) => {
          return <PaymentMethod {...cellProps} />;
        },
      },
      {
        Header: "Ver Detalles",
        accessor: "view",
        disableFilters: true,
        Cell: ({row}: { row: RowType }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={()=>toggleViewModal(row.original)}
            >
              View Details
            </Button>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} order={order} />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={orders}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    handleOrderClicks={handleOrderClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}


export default EcommerceOrder;
