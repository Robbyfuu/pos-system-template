/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../Common/withRouter";
import classname from "classnames";


import { connect } from "react-redux";
import { IState, INavbar } from "../../Interfaces";


const Navbar: React.FC<INavbar> = props => {

  const [dashboard, setdashboard] = useState(false);
  const [app, setapp] = useState(false);
  const [ecommerce, setecommerce] = useState(false);


  useEffect(() => {
    let matchingMenuItem = null;
    const ul = document.getElementById("navigation") as HTMLElement ;
    const items = ul.getElementsByTagName("a") ;
    removeActivation(items);
    for (let i = 0; i < items.length; ++i) {
      if (window.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  const removeActivation = (items: HTMLCollectionOf<HTMLAnchorElement>) => {
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item: HTMLAnchorElement) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement as HTMLElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }


  return (
    <React.Fragment>
    <div className="topnav">
      <div className="container-fluid">
        <nav
          className="navbar navbar-light navbar-expand-lg topnav-menu"
          id="navigation"
        >
          <Collapse
            isOpen={props.leftMenu}
            className="navbar-collapse"
            id="topnav-menu-content"
          >
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle arrow-none"
                  onClick={e => {
                    e.preventDefault();
                    setdashboard(!dashboard);
                  }}
                  to="/dashboard"
                >
                  <i className="bx bx-home-circle me-2"></i>
                  {("Dashboard")} {props.menuOpen}
                  <div className="arrow-down"></div>
                </Link>
                <div
                  className={classname("dropdown-menu", { show: dashboard })}
                >
                  <Link to="/dashboard" className="dropdown-item">
                    {("Default")}
                  </Link>
                </div>
              </li>


              <li className="nav-item dropdown">
                <Link
                  to="/#"
                  onClick={e => {
                    e.preventDefault();
                    setapp(!app);
                  }}
                  className="nav-link dropdown-togglez arrow-none"
                >
                  <i className="bx bx-customize me-2"></i>
                  {("Apps")} <div className="arrow-down"></div>
                </Link>
                <div className={classname("dropdown-menu", { show: app })}>
                  <Link to="#" className="dropdown-item">
                    {("Calendar")}
                  </Link>
                  // Ecommerce
                  <div className="dropdown">
                    <Link
                      to="/#"
                      className="dropdown-item dropdown-toggle arrow-none"
                      onClick={e => {
                        e.preventDefault();
                        setecommerce(!ecommerce);
                      }}
                    >
                      {(" Ecommerce")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: ecommerce,
                      })}
                    >
                      <Link to="#" className="dropdown-item">
                        {("Products")}
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                      >
                        {("Product Detail")}
                      </Link>
                      <Link to="#" className="dropdown-item">
                        {("Orders")}
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                      >
                        {("Customers")}
                      </Link>
                      <Link to="#" className="dropdown-item">
                        {("Cart")}
                      </Link>
                      <Link to="#" className="dropdown-item">
                        {("Checkout")}
                      </Link>
                      <Link to="#" className="dropdown-item">
                        {("Shops")}
                      </Link>
                      <Link
                        to="#"
                        className="dropdown-item"
                      >
                        {("Add Product")}
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </Collapse>
        </nav>
      </div>
    </div>
  </React.Fragment>
  );
};



const mapStatetoProps = (state: IState) => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {})((Navbar))
);
