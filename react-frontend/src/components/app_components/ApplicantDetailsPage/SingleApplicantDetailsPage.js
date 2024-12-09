import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import ContactDetailsPage from "../ContactDetailsPage/ContactDetailsPage";
import RefereesPage from "../RefereesPage/RefereesPage";
import SupportingDocumentsPage from "../SupportingDocumentsPage/SupportingDocumentsPage";

const SingleApplicantDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [studentUser, setStudentUser] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("applicantDetails")
            .get(urlParams.singleApplicantDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"studentUser"] }})
            .then((res) => {
                set_entity(res || {});
                const studentUser = Array.isArray(res.studentUser)
            ? res.studentUser.map((elem) => ({ _id: elem._id, passport: elem.passport }))
            : res.studentUser
                ? [{ _id: res.studentUser._id, passport: res.studentUser.passport }]
                : [];
        setStudentUser(studentUser);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ApplicantDetails", type: "error", message: error.message || "Failed get applicantDetails" });
            });
    }, [props,urlParams.singleApplicantDetailsId]);


    const goBack = () => {
        navigate("/applicantDetails");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">ApplicantDetails</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>applicantDetails/{urlParams.singleApplicantDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Full Name</label><p className="m-0 ml-3" >{_entity?.fullName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">First Name</label><p className="m-0 ml-3" >{_entity?.firstName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Surname</label><p className="m-0 ml-3" >{_entity?.surname}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Nationality</label><p className="m-0 ml-3" >{_entity?.nationality}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Passport Number</label><p className="m-0 ml-3" >{_entity?.passportNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Passport Expiry Date</label><p id="passportExpiryDate" className="m-0 ml-3" >{_entity?.passportExpiryDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Date Of Birth</label><p id="dateOfBirth" className="m-0 ml-3" >{_entity?.dateOfBirth}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Is Special Conditions</label><p className="m-0" ><i id="isSpecialConditions" className={`pi ${_entity?.isSpecialConditions?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Is Former Student</label><p className="m-0" ><i id="isFormerStudent" className={`pi ${_entity?.isFormerStudent?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Student Id</label><p className="m-0 ml-3" >{_entity?.studentId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Is Hold Valid Malaysian Visa</label><p className="m-0" ><i id="isHoldValidMalaysianVisa" className={`pi ${_entity?.isHoldValidMalaysianVisa?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Student Pass Expiry Date</label><p id="studentPassExpiryDate" className="m-0 ml-3" >{_entity?.studentPassExpiryDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Institution Enrolled</label><p className="m-0 ml-3" >{_entity?.institutionEnrolled}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">City</label><p className="m-0 ml-3" >{_entity?.malaysianEmbassyCity}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Student User</label>
                    {studentUser.map((elem) => (
                        <Link key={elem._id} to={`/studentUser/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.passport}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
      </div>
       <div className="mt-2">
            <TabView>
                
                    <TabPanel header="contactDetails" leftIcon="pi pi-building-columns mr-2">
                    <ContactDetailsPage/>
                    </TabPanel>
                    

                    <TabPanel header="referees" leftIcon="pi pi-building-columns mr-2">
                    <RefereesPage/>
                    </TabPanel>
                    

                    <TabPanel header="supportingDocuments" leftIcon="pi pi-building-columns mr-2">
                    <SupportingDocumentsPage/>
                    </TabPanel>
                    
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleApplicantDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="applicantDetails"
      />
    <div
        id="rightsidebar"
        className={classNames(
          "overlay-auto z-10 surface-overlay shadow-2 fixed top-0 right-0 w-20rem animation-duration-150 animation-ease-in-out",
          { hidden: !isHelpSidebarVisible, block: isHelpSidebarVisible }
        )}
        style={{
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="flex flex-column h-full p-4 bg-white" style={{ height: "calc(100% - 60px)", marginTop: "60px" }}>
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleApplicantDetailsPage);
