/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

//i18n

import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";
//import images
import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
// import Interfaces
import { ISidebar, IState } from "../../Interfaces";


const Sidebar: React.FC <ISidebar> = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="17" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoLightSvg} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLightPng} alt="" height="19" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};



const mapStatetoProps = (state: IState) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter((Sidebar)));
