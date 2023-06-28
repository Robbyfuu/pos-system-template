import React from "react";
import { Navigate } from "react-router-dom";

interface AuthmiddlewareProps {
  children?: React.ReactNode;
  
}

  const Authmiddleware: React.FC<AuthmiddlewareProps> = (props) => {
    if (!localStorage.getItem("authUser")) {
      console.log('entre')
      return <Navigate to="/login" /> ;
    }
    return <React.Fragment>{props.children}</React.Fragment>;
  };

  export default Authmiddleware;

