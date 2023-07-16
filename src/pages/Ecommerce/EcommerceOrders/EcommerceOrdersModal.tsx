import { moneyFormatter } from "@/src/common/functions";
import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

interface EcommerceOrdersModalProps {
  isOpen: boolean;
  toggle: () => void;
  order: any;
}
const EcommerceOrdersModal: React.FC<EcommerceOrdersModalProps> = (props) => {
  const { isOpen, toggle, order } = props;

  console.log("EcommerceOrdersModalProps", props);
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex={-1}
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Detalla de la Orden</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Número de Orden:{" "}
            <span className="text-primary">{order?.orderNumber}</span>
          </p>
          <p className="mb-4">
            Vendedor:{" "}
            <span className="text-primary">{order?.seller?.firtsName}</span>
          </p>

          <div className="table-responsive">
            <Table className="table align-middle table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((product: any, index: number) => (
                  <tr key={index}>
                    <th scope="row">
                      <div>
                        <img alt="" src={product.productImage} className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          {product.productName}
                        </h5>
                        <p className="text-muted mb-0">{ moneyFormatter(product.productPrice,'$')}</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={2}>
                    <h6 className="m-0 text-end">Total:</h6>
                  </td>
                  <td>{order?.total?  moneyFormatter(order?.total,'$'): ''}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default EcommerceOrdersModal;
