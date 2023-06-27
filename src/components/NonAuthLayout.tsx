import React from "react";
import withRouter from "./Common/withRouter";

interface NonAuthLayoutProps {
  children: React.ReactNode;
}
// eslint-disable-next-line react-refresh/only-export-components
const NonAuthLayout: React.FC<NonAuthLayoutProps> = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};


// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(NonAuthLayout);
