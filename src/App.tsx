import React from "react";

import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import { useSelector } from "react-redux";

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout";
import HorizontalLayout from "./components/HorizontalLayout";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

import { IState } from "./Interfaces";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// import fakeBackend from "/src/helpers/AuthType/fakeBackend";

// // Activating fake backend
// fakeBackend();

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_APIKEY,
//   authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
//   databaseURL: import.meta.env.VITE_APP_DATABASEURL,
//   projectId: import.meta.env.VITE_APP_PROJECTID,
//   storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APP_APPID,
//   measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = () => {
  const { layoutType } = useSelector((state: IState) => ({
    layoutType: state.Layout.layoutType,
  }));

  function getLayout(layoutType: string) {
    let layoutCls = VerticalLayout;
    switch (layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = layoutType ? getLayout(layoutType) : VerticalLayout;

  return (
    <React.Fragment>
      <Routes>
        {/* ts-ignore */}
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <>
              {/*@ts-ignore  */}
                <NonAuthLayout>{route.component}</NonAuthLayout>
              </>
            }
            key={idx}
            // exact={true}
            caseSensitive
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                {/*@ts-ignore  */}
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            // exact={true}
          />
        ))}
        {/* </Route> */}
      </Routes>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
