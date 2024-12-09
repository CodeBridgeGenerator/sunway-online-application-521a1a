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


const SingleContactDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [applicant, setApplicant] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("contactDetails")
            .get(urlParams.singleContactDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"applicant"] }})
            .then((res) => {
                set_entity(res || {});
                const applicant = Array.isArray(res.applicant)
            ? res.applicant.map((elem) => ({ _id: elem._id, fullName: elem.fullName }))
            : res.applicant
                ? [{ _id: res.applicant._id, fullName: res.applicant.fullName }]
                : [];
        setApplicant(applicant);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ContactDetails", type: "error", message: error.message || "Failed get contactDetails" });
            });
    }, [props,urlParams.singleContactDetailsId]);


    const goBack = () => {
        navigate("/contactDetails");
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
                    <h3 className="m-0">Contact Details</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>contactDetails/{urlParams.singleContactDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Full Correspondence Address</label><p className="m-0 ml-3" >{_entity?.fullCorrespondenceAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">City/Town</label><p className="m-0 ml-3" >{_entity?.correspondenceCityTown}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Postal Code</label><p className="m-0 ml-3" >{_entity?.correspondencePostalCode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Student's Mobile Number</label><p className="m-0 ml-3" >{_entity?.studentMobileNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Home Contact Number</label><p className="m-0 ml-3" >{_entity?.correspondenceHomeContactNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Student's Email</label><p className="m-0 ml-3" >{_entity?.studentEmail}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">IsSameAsCorrespondence Address</label><p className="m-0" ><i id="isSameAsCorrespondenceAddress" className={`pi ${_entity?.isSameAsCorrespondenceAddress?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Full Permanent Address</label><p className="m-0 ml-3" >{_entity?.fullPermanentAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">City/Town</label><p className="m-0 ml-3" >{_entity?.permanentCityTown}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Postal Code</label><p className="m-0 ml-3" >{_entity?.permanentPostalCode}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Home/Mobile Contact Number</label><p className="m-0 ml-3" >{_entity?.permanentContactNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Name (as per NRIC/Passport)</label><p className="m-0 ml-3" >{_entity?.parentName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Mobile No</label><p className="m-0 ml-3" >{_entity?.parentMobileNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Home No</label><p className="m-0 ml-3" >{_entity?.parentHomeNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Email</label><p className="m-0 ml-3" >{_entity?.parentEmail}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">OfficeNo</label><p className="m-0 ml-3" >{_entity?.parentOfficeNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Name</label><p className="m-0 ml-3" >{_entity?.emergencyName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Mobile No</label><p className="m-0 ml-3" >{_entity?.emergencyMobileNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Home No</label><p className="m-0 ml-3" >{_entity?.emergencyHomeNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Email</label><p className="m-0 ml-3" >{_entity?.emergencyEmail}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Office No</label><p className="m-0 ml-3" >{_entity?.emergencyOfficeNo}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Applicant</label>
                    {applicant.map((elem) => (
                        <Link key={elem._id} to={`/applicantDetails/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.fullName}</p>
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
                
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleContactDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="contactDetails"
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

export default connect(mapState, mapDispatch)(SingleContactDetailsPage);
