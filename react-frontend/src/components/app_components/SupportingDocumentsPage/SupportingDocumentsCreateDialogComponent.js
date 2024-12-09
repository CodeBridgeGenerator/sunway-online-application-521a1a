import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import UploadFilesToS3 from "../../../services/UploadFilesToS3";
const educationLevelArray = [];
const educationLevelOptions = educationLevelArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const SupportingDocumentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [applicant, setApplicant] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [applicant], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.passportPhoto)) {
                error["passportPhoto"] = `Passport Photo field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.healthDeclarationForm)) {
                error["healthDeclarationForm"] = `Health Declaration Form field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.qualification)) {
                error["qualification"] = `Qualification field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.schoolInstitute)) {
                error["schoolInstitute"] = `School/Institute field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.academicDocuments)) {
                error["academicDocuments"] = `Academic Documents field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            applicant: _entity?.applicant?._id,passportPhoto: _entity?.passportPhoto,passport: _entity?.passport,healthDeclarationForm: _entity?.healthDeclarationForm,educationLevel: _entity?.educationLevel,qualification: _entity?.qualification,schoolInstitute: _entity?.schoolInstitute,academicDocuments: _entity?.academicDocuments,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("supportingDocuments").create(_data);
        const eagerResult = await client
            .service("supportingDocuments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "applicant",
                    service : "applicantDetails",
                    select:["fullName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Supporting Documents updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Supporting Documents" });
        }
        setLoading(false);
    };

    const onFileLoaded = (file, status) => {
    if (status)
      props.alert({
        title: "file uploader",
        type: "success",
        message: "file uploaded" + file.name
      });
    else
      props.alert({
        title: "file uploader",
        type: "error",
        message: "file uploader failed" + file.name
      });
  };,const onFileLoaded = (file, status) => {
    if (status)
      props.alert({
        title: "file uploader",
        type: "success",
        message: "file uploaded" + file.name
      });
    else
      props.alert({
        title: "file uploader",
        type: "error",
        message: "file uploader failed" + file.name
      });
  };,const onFileLoaded = (file, status) => {
    if (status)
      props.alert({
        title: "file uploader",
        type: "success",
        message: "file uploaded" + file.name
      });
    else
      props.alert({
        title: "file uploader",
        type: "error",
        message: "file uploader failed" + file.name
      });
  };,const onFileLoaded = (file, status) => {
    if (status)
      props.alert({
        title: "file uploader",
        type: "success",
        message: "file uploaded" + file.name
      });
    else
      props.alert({
        title: "file uploader",
        type: "error",
        message: "file uploader failed" + file.name
      });
  };

    const setId = (id) => { setValByKey("passportPhoto", id);  };,const setId = (id) => { setValByKey("passport", id);  };,const setId = (id) => { setValByKey("healthDeclarationForm", id);  };,const setId = (id) => { setValByKey("academicDocuments", id);  };

    useEffect(() => {
                    // on mount applicantDetails
                    client
                        .service("applicantDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleApplicantDetailsId } })
                        .then((res) => {
                            setApplicant(res.data.map((e) => { return { name: e['fullName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "ApplicantDetails", type: "error", message: error.message || "Failed get applicantDetails" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const applicantOptions = applicant.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Supporting Documents" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="supportingDocuments-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicant">Applicant:</label>
                <Dropdown id="applicant" value={_entity?.applicant?._id} optionLabel="name" optionValue="value" options={applicantOptions} onChange={(e) => setValByKey("applicant", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicant"]) ? (
              <p className="m-0" key="error-applicant">
                {error["applicant"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                    <span className="align-items-center">
                        <label htmlFor="passportPhoto">Passport Photo:</label>
                        <UploadFilesToS3 type={'create'} user={props.user} id={urlParams.id} serviceName="supportingDocuments" onUploadComplete={setId} onFileLoaded={onFileLoaded}/>
                    </span>
                    <small className="p-error">
                    {!_.isEmpty(error["passportPhoto"]) ? (
                      <p className="m-0" key="error-passportPhoto">
                        {error["passportPhoto"]}
                      </p>
                    ) : null}
                  </small>
                    </div>
<div className="col-12 field">
                    <span className="align-items-center">
                        <label htmlFor="passport">Passport:</label>
                        <UploadFilesToS3 type={'create'} user={props.user} id={urlParams.id} serviceName="supportingDocuments" onUploadComplete={setId} onFileLoaded={onFileLoaded}/>
                    </span>
                    <small className="p-error">
                    {!_.isEmpty(error["passport"]) ? (
                      <p className="m-0" key="error-passport">
                        {error["passport"]}
                      </p>
                    ) : null}
                  </small>
                    </div>
<div className="col-12 field">
                    <span className="align-items-center">
                        <label htmlFor="healthDeclarationForm">Health Declaration Form:</label>
                        <UploadFilesToS3 type={'create'} user={props.user} id={urlParams.id} serviceName="supportingDocuments" onUploadComplete={setId} onFileLoaded={onFileLoaded}/>
                    </span>
                    <small className="p-error">
                    {!_.isEmpty(error["healthDeclarationForm"]) ? (
                      <p className="m-0" key="error-healthDeclarationForm">
                        {error["healthDeclarationForm"]}
                      </p>
                    ) : null}
                  </small>
                    </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="educationLevel">Education Level:</label>
                <Dropdown id="educationLevel" value={_entity?.educationLevel} options={educationLevelOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("educationLevel", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["educationLevel"]) ? (
              <p className="m-0" key="error-educationLevel">
                {error["educationLevel"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="qualification">Qualification:</label>
                <InputText id="qualification" className="w-full mb-3 p-inputtext-sm" value={_entity?.qualification} onChange={(e) => setValByKey("qualification", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["qualification"]) ? (
              <p className="m-0" key="error-qualification">
                {error["qualification"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="schoolInstitute">School/Institute:</label>
                <InputText id="schoolInstitute" className="w-full mb-3 p-inputtext-sm" value={_entity?.schoolInstitute} onChange={(e) => setValByKey("schoolInstitute", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["schoolInstitute"]) ? (
              <p className="m-0" key="error-schoolInstitute">
                {error["schoolInstitute"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                    <span className="align-items-center">
                        <label htmlFor="academicDocuments">Academic Documents:</label>
                        <UploadFilesToS3 type={'create'} user={props.user} id={urlParams.id} serviceName="supportingDocuments" onUploadComplete={setId} onFileLoaded={onFileLoaded}/>
                    </span>
                    <small className="p-error">
                    {!_.isEmpty(error["academicDocuments"]) ? (
                      <p className="m-0" key="error-academicDocuments">
                        {error["academicDocuments"]}
                      </p>
                    ) : null}
                  </small>
                    </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SupportingDocumentsCreateDialogComponent);
