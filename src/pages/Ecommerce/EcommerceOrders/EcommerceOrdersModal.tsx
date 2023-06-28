import React from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"

interface EcommerceOrdersModalProps {
  isOpen: boolean
  toggle: () => void
}
const EcommerceOrdersModal: React.FC <EcommerceOrdersModalProps> = props => {
  const { isOpen, toggle } = props
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
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Product id: <span className="text-primary">#SK2540</span>
          </p>
          <p className="mb-4">
            Billing Name: <span className="text-primary">Neal Matthews</span>
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
                <tr>
                  <th scope="row">
                    <div>
                      <img  alt="" className="avatar-sm" />
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">
                        Wireless Headphone (Black)
                      </h5>
                      <p className="text-muted mb-0">$ 225 x 1</p>
                    </div>
                  </td>
                  <td>$ 255</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div>
                      <img  alt="" className="avatar-sm" />
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">
                        Hoodie (Blue)
                      </h5>
                      <p className="text-muted mb-0">$ 145 x 1</p>
                    </div>
                  </td>
                  <td>$ 145</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <h6 className="m-0 text-end">Sub Total:</h6>
                  </td>
                  <td>$ 400</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <h6 className="m-0 text-end">Shipping:</h6>
                  </td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <h6 className="m-0 text-end">Total:</h6>
                  </td>
                  <td>$ 400</td>
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
  )
}


export default EcommerceOrdersModal
