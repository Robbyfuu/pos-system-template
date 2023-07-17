import React from "react";
import { Link } from "react-router-dom";
 //@ts-ignore
import { Badge } from "reactstrap";
import { DateTime} from "luxon";
import { moneyFormatter } from "@/src/common/functions";

const formateDate = (date: string, format?: string) => {
  const dateFormat = format ? format : "dd MMMM yyyy";
  const date1 = DateTime.fromISO(date).setLocale("es").toFormat(dateFormat);
  return date1;
}
 //@ts-ignore
const toLowerCase1 = (str) => {
  return str === "" || str === undefined ? "" : str.toLowerCase();
};
 //@ts-ignore
const OrderId = (cell) => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? cell.value : ""}
    </Link>
  );
};
 //@ts-ignore
const BillingName = (cell) => {
  return cell.value ? cell.value : "";
};
 //@ts-ignore
const Date = (cell) => {
  return cell.value ? <span>{formateDate(cell.value)}</span> : <span></span>;;
};
 //@ts-ignore
const Total = (cell) => {
  return cell.value ? <span>{moneyFormatter(cell.value, '$')}</span>  : <span></span>;
};
 //@ts-ignore
const PaymentStatus = (cell) => {
  return (
    <div
      className={
        "badge font-size-12 badge-soft-success" /* +
        (cell.value === "pendiente"
          ? "success"
          : "danger" && cell.value === "efectivo"
          ? "warning"
          : "danger") */
      }
       //@ts-ignore
      pill="true"
    >
      {cell.value}
    </div>
  );
};
 //@ts-ignore
const PaymentMethod = (cell) => {
  return (
    <span>
      <i
        className={
          cell.value === "Paypal"
            ? "fab fa-cc-paypal me-1"
            : "" || cell.value === "efectivo"
            ? "fab fas fa-money-bill-alt me-1"
            : "" || cell.value === "debito/credito"
            ? "fab fa-cc-mastercard me-1"
            : "" || cell.value === "Visa"
            ? "fab fa-cc-visa me-1"
            : ""
        }
      />{" "}
      {cell.value}
    </span>
  );
};
export { OrderId, BillingName, Date, Total, PaymentStatus, PaymentMethod };
