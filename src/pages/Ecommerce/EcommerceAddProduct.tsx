import React, { useState } from "react";
import { Link } from "react-router-dom";
import { notification } from "antd";

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
  Row,
} from "reactstrap";
import Dropzone, { FileWithPath } from "react-dropzone";
//GraphQL
import { useMutation } from "urql";
import { productsCreateMutation } from "@/src/helpers/Apollo/querys";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
interface Accept {
  [key: string]: string[];
}
const EcommerceAddProduct = () => {
  //meta title
  document.title =
    "Agregar Producto | Punto de Ventas";
  const [_result, executeMutation] = useMutation(productsCreateMutation);
  const [selectedFile, setSelectedFile] = useState<FileWithPath | undefined>();
  const [productName, setProductName] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [category, setCategory] = useState("");
  const [measureType, setMeasureType] = useState("");
  const [unitsAvailable, setUnitsAvailable] = useState("");

  const acceptConfig: Accept = {
    "image/*": ["jpg", "jpeg", "png", "gif", "webp"],
  };
  function handleAcceptedFile(file: FileWithPath) {
    Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });
    setSelectedFile(file);
  }
  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductName(event.target.value);
  };

  const handlePriceProductChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceProduct(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleMeasureTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMeasureType(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Realizar alguna acción con los valores guardados
    const variables = {
      input: {
        productName,
        productPrice: parseFloat(priceProduct),
        productCategory: category,
        productUnit: measureType,
        productInventory: parseFloat(unitsAvailable),
      },
      file: selectedFile,
    };

    await executeMutation(variables).then((result) => {
      if (result.error) {
        notification.error({ message: result.error.message });
      } else {
        notification.success({ message: "Producto creado con éxito", duration: 1 });
      }
    });
    setProductName("");
    setPriceProduct("");
    setCategory("");
    setMeasureType("");
    setUnitsAvailable("");
    setSelectedFile(undefined);
  };

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Add Product" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Información del Producto</CardTitle>
                  <p className="card-title-desc mb-4">
                    Complete toda la información a continuación
                  </p>

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="productname">Nombre Producto</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            className="form-control"
                            placeholder="Palta"
                            value={productName}
                            onChange={handleProductNameChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="manufacturername">
                            Precio del Producto
                          </Label>
                          <Input
                            id="priceproduct"
                            name="priceproduct"
                            type="text"
                            className="form-control"
                            placeholder="3000"
                            value={priceProduct}
                            onChange={handlePriceProductChange}
                          />
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="manufacturername">
                            Unidades/Kilos Disponibles
                          </Label>
                          <Input
                            id="priceproduct"
                            name="priceproduct"
                            type="text"
                            className="form-control"
                            placeholder="20"
                            value={unitsAvailable}
                            onChange={(e) => setUnitsAvailable(e.target.value)}
                          />
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="manufacturerbrand">
                            Categoría del Producto
                          </Label>
                          <select
                            className="form-control select2"
                            value={category}
                            onChange={handleCategoryChange}
                          >
                            <option>Selecciona una opción</option>
                            <option value="Fruta">Frutas</option>
                            <option value="Abarrote">Abarrotes</option>
                            <option value="Verdura">Verduras</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="price">
                            Tipo de Medida del Producto
                          </Label>
                          <select
                            className="form-control select2"
                            value={measureType}
                            onChange={handleMeasureTypeChange}
                          >
                            <option>Selecciona una opción</option>
                            <option value="kg">Kiligramos</option>
                            <option value="uni">Unidad</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <CardTitle className="mb-3">Product Images</CardTitle>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        const file: FileWithPath = acceptedFiles[0];
                        handleAcceptedFile(file);
                      }}
                      maxFiles={1}
                      multiple={false}
                      accept={acceptConfig}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFile && (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key="file"
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={selectedFile.name}
                                  //@ts-ignore
                                  src={selectedFile.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {" "}
                                  {/* @ts-ignore */}
                                  {selectedFile.name}
                                </Link>
                                <p className="mb-0">
                                  {/* @ts-ignore */}
                                  <strong>{selectedFile.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      )}
                    </div>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                      <Button type="submit" color="primary" className="btn ">
                        Agregar Producto
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceAddProduct;
