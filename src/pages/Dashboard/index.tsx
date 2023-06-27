import React from "react";
import { Container } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n

const Dashboard: React.FC = () => {
  //meta title
  document.title = "Dashboard | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Dashboards"} breadcrumbItem={"Dashboard"} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
