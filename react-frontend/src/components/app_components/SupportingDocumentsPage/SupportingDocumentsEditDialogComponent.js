import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import UploadFilesToS3 from "../../../services/UploadFilesToS3";
const educationLevelArray = [];
const educationLevelOptions = educationLevelArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const SupportingDocumentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [applicant, setApplicant] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount applicantDetails
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

    const onSave = async () => {
        let _data = {
            applicant: _entity?.applicant?._id,
passportPhoto: _entity?.passportPhoto,
passport: _entity?.passport,
healthDeclarationForm: _entity?.healthDeclarationForm,
educationLevel: _entity?.educationLevel,
qualification: _entity?.qualification,
schoolInstitute: _entity?.schoolInstitute,
academicDocuments: _entity?.academicDocuments,
        };

        setLoading(true);
        try {
            
        await client.service("supportingDocuments").patch(_entity._id, _data);
        const eagerResult = await client
            .service("supportingDocuments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "applicant",
                    service : "applicantDetails",
                    select:["fullName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info supportingDocuments updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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
        <Dialog header="Edit Supporting Documents" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="supportingDocuments-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="applicant">Applicant:</label>
                <Dropdown id="applicant" value={_entity?.applicant?._id} optionLabel="name" optionValue="value" options={applicantOptions} onChange={(e) => setValByKey("applicant", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["applicant"]) && (
              <p className="m-0" key="error-applicant">
                {error["applicant"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="passportPhoto">Passport Photo:</label>
                    <UploadFilesToS3 type={'edit'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleSupportingDocumentsId} serviceName="supportingDocuments" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["passportPhoto"]) && (
                  <p className="m-0" key="error-passportPhoto">
                    {error["passportPhoto"]}
                  </p>
                )}
              </small>
                </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="passport">Passport:</label>
                    <UploadFilesToS3 type={'edit'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleSupportingDocumentsId} serviceName="supportingDocuments" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["passport"]) && (
                  <p className="m-0" key="error-passport">
                    {error["passport"]}
                  </p>
                )}
              </small>
                </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="healthDeclarationForm">Health Declaration Form:</label>
                    <UploadFilesToS3 type={'edit'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleSupportingDocumentsId} serviceName="supportingDocuments" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["healthDeclarationForm"]) && (
                  <p className="m-0" key="error-healthDeclarationForm">
                    {error["healthDeclarationForm"]}
                  </p>
                )}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="educationLevel">Education Level:</label>
                <Dropdown id="educationLevel" value={_entity?.educationLevel} options={educationLevelOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("educationLevel", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["educationLevel"]) && (
              <p className="m-0" key="error-educationLevel">
                {error["educationLevel"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="qualification">Qualification:</label>
                <InputText id="qualification" className="w-full mb-3 p-inputtext-sm" value={_entity?.qualification} onChange={(e) => setValByKey("qualification", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["qualification"]) && (
              <p className="m-0" key="error-qualification">
                {error["qualification"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="schoolInstitute">School/Institute:</label>
                <InputText id="schoolInstitute" className="w-full mb-3 p-inputtext-sm" value={_entity?.schoolInstitute} onChange={(e) => setValByKey("schoolInstitute", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["schoolInstitute"]) && (
              <p className="m-0" key="error-schoolInstitute">
                {error["schoolInstitute"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="academicDocuments">Academic Documents:</label>
                    <UploadFilesToS3 type={'edit'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleSupportingDocumentsId} serviceName="supportingDocuments" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["academicDocuments"]) && (
                  <p className="m-0" key="error-academicDocuments">
                    {error["academicDocuments"]}
                  </p>
                )}
              </small>
                </div>
                <div className="col-12">&nbsp;</div>
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
