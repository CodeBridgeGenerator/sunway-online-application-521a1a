import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import StudentUsersPage from "../StudentUsersPage/StudentUsersPage";
import ApplicantDetailsPage from "../ApplicantDetailsPage/ApplicantDetailsPage";
import ApplicationsPage from "../ApplicationsPage/ApplicationsPage";
import ProgrammesPage from "../ProgrammesPage/ProgrammesPage";
import ContactDetailsPage from "../ContactDetailsPage/ContactDetailsPage";
import RefereesPage from "../RefereesPage/RefereesPage";
import SupportingDocumentsPage from "../SupportingDocumentsPage/SupportingDocumentsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "studentUsers":
                return <StudentUsersPage />;
case "applicantDetails":
                return <ApplicantDetailsPage />;
case "applications":
                return <ApplicationsPage />;
case "programmes":
                return <ProgrammesPage />;
case "contactDetails":
                return <ContactDetailsPage />;
case "referees":
                return <RefereesPage />;
case "supportingDocuments":
                return <SupportingDocumentsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
