/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import withRouter from "../Common/withRouter";

//actions
import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
  showRightSidebarAction,
} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

//components
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import RightSidebar from "../CommonForBoth/RightSidebar";
import { useLocation } from "react-router-dom";
//Interfaces
import { IState, IHorizontalLayout } from "../../Interfaces";

const Layout: React.FC<IHorizontalLayout> = (props) => {
  const dispatch = useDispatch();

  const { topbarTheme, layoutWidth, isPreloader, showRightSidebar } =
    useSelector((state: IState) => ({
      topbarTheme: state.Layout.topbarTheme,
      layoutWidth: state.Layout.layoutWidth,
      isPreloader: state.Layout.isPreloader,
      showRightSidebar: state.Layout.showRightSidebar,
    }));

  /*
  document title
  */

  const pathName = useLocation();

  useEffect(() => {
    const title = pathName.pathname;
    const currentage = title.charAt(1).toUpperCase() + title.slice(2);

    document.title =
      currentage + " | Skote - Vite React Admin & Dashboard Template";
  }, [pathName.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //hides right sidebar on body click
  const hideRightbar = (event: MouseEvent) => {
    const rightbar = document.getElementById("right-bar");
    //if clicked in inside right bar, then do nothing
    if (rightbar && rightbar.contains(event.target as Node)) {
      return;
    } else {
      //if clicked in outside of rightbar then fire action for hide rightbar
      dispatch(showRightSidebarAction(false));
    }
  };

  /*
  layout settings
  */
  useEffect(() => {
    dispatch(changeLayout("horizontal"));
  }, [dispatch]);

  useEffect(() => {
    //init body click event fot toggle rightbar
    document.body.addEventListener("click", hideRightbar, true);

    if (isPreloader === true) {
      const preloader = document.getElementById("preloader");
      const status = document.getElementById("status");
    
      if (preloader && status) {
        preloader.style.display = "block";
        status.style.display = "block";
    
        setTimeout(function () {
          if (preloader && status) {
            preloader.style.display = "none";
            status.style.display = "none";
          }
        }, 2500);
      }
    } else {
      const preloader = document.getElementById("preloader");
      const status = document.getElementById("status");
    
      if (preloader && status) {
        preloader.style.display = "none";
        status.style.display = "none";
      }
    }
  }, [hideRightbar, isPreloader]);

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [dispatch, topbarTheme]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [dispatch, layoutWidth]);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header
          theme={topbarTheme}
          isMenuOpened={isMenuOpened}
          openLeftMenuCallBack={openMenu}
        />
        <Navbar menuOpen={isMenuOpened} />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>

      {showRightSidebar ? <RightSidebar /> : null}
    </React.Fragment>
  );
};


export default withRouter(Layout);
