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


const SingleApplicationsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [applicant, setApplicant] = useState([]);
const [programme, setProgramme] = useState([]);
const [campus, setCampus] = useState([]);
const [location, setLocation] = useState([]);
const [programmeLevel, setProgrammeLevel] = useState([]);
const [programme, setProgramme] = useState([]);
const [intake, setIntake] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("applications")
            .get(urlParams.singleApplicationsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"applicant","programme","campus","location","programmeLevel","programme","intake"] }})
            .then((res) => {
                set_entity(res || {});
                const applicant = Array.isArray(res.applicant)
            ? res.applicant.map((elem) => ({ _id: elem._id, fullName: elem.fullName }))
            : res.applicant
                ? [{ _id: res.applicant._id, fullName: res.applicant.fullName }]
                : [];
        setApplicant(applicant);
const programme = Array.isArray(res.programme)
            ? res.programme.map((elem) => ({ _id: elem._id, programme: elem.programme }))
            : res.programme
                ? [{ _id: res.programme._id, programme: res.programme.programme }]
                : [];
        setProgramme(programme);
const campus = Array.isArray(res.campus)
            ? res.campus.map((elem) => ({ _id: elem._id, campus: elem.campus }))
            : res.campus
                ? [{ _id: res.campus._id, campus: res.campus.campus }]
                : [];
        setCampus(campus);
const location = Array.isArray(res.location)
            ? res.location.map((elem) => ({ _id: elem._id, location: elem.location }))
            : res.location
                ? [{ _id: res.location._id, location: res.location.location }]
                : [];
        setLocation(location);
const programmeLevel = Array.isArray(res.programmeLevel)
            ? res.programmeLevel.map((elem) => ({ _id: elem._id, programmeLevel: elem.programmeLevel }))
            : res.programmeLevel
                ? [{ _id: res.programmeLevel._id, programmeLevel: res.programmeLevel.programmeLevel }]
                : [];
        setProgrammeLevel(programmeLevel);
const programme = Array.isArray(res.programme)
            ? res.programme.map((elem) => ({ _id: elem._id, programme: elem.programme }))
            : res.programme
                ? [{ _id: res.programme._id, programme: res.programme.programme }]
                : [];
        setProgramme(programme);
const intake = Array.isArray(res.intake)
            ? res.intake.map((elem) => ({ _id: elem._id, intake: elem.intake }))
            : res.intake
                ? [{ _id: res.intake._id, intake: res.intake.intake }]
                : [];
        setIntake(intake);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Applications", type: "error", message: error.message || "Failed get applications" });
            });
    }, [props,urlParams.singleApplicationsId]);


    const goBack = () => {
        navigate("/applications");
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
                    <h3 className="m-0">Applications</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>applications/{urlParams.singleApplicationsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Acknowledgement Consent</label><p className="m-0" ><i id="acknowledgementConsent" className={`pi ${_entity?.acknowledgementConsent?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Application Date</label><p id="applicationDate" className="m-0 ml-3" >{_entity?.applicationDate}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Applicant</label>
                    {applicant.map((elem) => (
                        <Link key={elem._id} to={`/applicants/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.fullName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Programme</label>
                    {programme.map((elem) => (
                        <Link key={elem._id} to={`/programmes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.programme}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Campus</label>
                    {campus.map((elem) => (
                        <Link key={elem._id} to={`/programmes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.campus}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Location</label>
                    {location.map((elem) => (
                        <Link key={elem._id} to={`/programmes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.location}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Programme Level</label>
                    {programmeLevel.map((elem) => (
                        <Link key={elem._id} to={`/programmes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.programmeLevel}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Programme</label>
                    {programme.map((elem) => (
                        <Link key={elem._id} to={`/programmes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.programme}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Intake</label>
                    {intake.map((elem) => (
                        <Link key={elem._id} to={`/programmes/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.intake}</p>
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
        recordId={urlParams.singleApplicationsId}
        user={props.user}
        alert={props.alert}
        serviceName="applications"
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

export default connect(mapState, mapDispatch)(SingleApplicationsPage);
