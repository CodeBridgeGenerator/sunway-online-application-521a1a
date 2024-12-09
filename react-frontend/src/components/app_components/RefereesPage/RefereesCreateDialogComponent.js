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
const refereeCompanyCountryArray = [];
const refereeCompanyCountryOptions = refereeCompanyCountryArray.map((x) => ({ name: x, value: x }));

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

const RefereesCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.refereeName)) {
                error["refereeName"] = `Referee Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.refereePosition)) {
                error["refereePosition"] = `Referee Position field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.companyNameAndAddress)) {
                error["companyNameAndAddress"] = `Company Name And Address field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.refereeCompanyPostalCode)) {
                error["refereeCompanyPostalCode"] = `Referee Company Postal Code field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.refereeCompanyState)) {
                error["refereeCompanyState"] = `Referee Company State field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.refereeContactNoHome)) {
                error["refereeContactNoHome"] = `Referee Contact Number Home field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.refereeContactNoMobile)) {
                error["refereeContactNoMobile"] = `Referee Contact Number Mobile field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            applicant: _entity?.applicant?._id,refereeName: _entity?.refereeName,refereePosition: _entity?.refereePosition,companyNameAndAddress: _entity?.companyNameAndAddress,refereeCompanyPostalCode: _entity?.refereeCompanyPostalCode,refereeCompanyState: _entity?.refereeCompanyState,refereeCompanyCountry: _entity?.refereeCompanyCountry,refereeContactNoHome: _entity?.refereeContactNoHome,refereeContactNoMobile: _entity?.refereeContactNoMobile,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("referees").create(_data);
        const eagerResult = await client
            .service("referees")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "applicant",
                    service : "applicantDetails",
                    select:["fullName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Referees updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Referees" });
        }
        setLoading(false);
    };

    

    

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
        <Dialog header="Create Referees" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="referees-create-dialog-component">
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refereeName">Referee Name:</label>
                <InputText id="refereeName" className="w-full mb-3 p-inputtext-sm" value={_entity?.refereeName} onChange={(e) => setValByKey("refereeName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refereeName"]) ? (
              <p className="m-0" key="error-refereeName">
                {error["refereeName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refereePosition">Referee Position:</label>
                <InputText id="refereePosition" className="w-full mb-3 p-inputtext-sm" value={_entity?.refereePosition} onChange={(e) => setValByKey("refereePosition", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refereePosition"]) ? (
              <p className="m-0" key="error-refereePosition">
                {error["refereePosition"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="companyNameAndAddress">Company Name And Address:</label>
                <InputText id="companyNameAndAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.companyNameAndAddress} onChange={(e) => setValByKey("companyNameAndAddress", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["companyNameAndAddress"]) ? (
              <p className="m-0" key="error-companyNameAndAddress">
                {error["companyNameAndAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refereeCompanyPostalCode">Referee Company Postal Code:</label>
                <InputText id="refereeCompanyPostalCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.refereeCompanyPostalCode} onChange={(e) => setValByKey("refereeCompanyPostalCode", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refereeCompanyPostalCode"]) ? (
              <p className="m-0" key="error-refereeCompanyPostalCode">
                {error["refereeCompanyPostalCode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refereeCompanyState">Referee Company State:</label>
                <InputText id="refereeCompanyState" className="w-full mb-3 p-inputtext-sm" value={_entity?.refereeCompanyState} onChange={(e) => setValByKey("refereeCompanyState", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refereeCompanyState"]) ? (
              <p className="m-0" key="error-refereeCompanyState">
                {error["refereeCompanyState"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refereeCompanyCountry">Referee Company Country:</label>
                <Dropdown id="refereeCompanyCountry" value={_entity?.refereeCompanyCountry} options={refereeCompanyCountryOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("refereeCompanyCountry", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refereeCompanyCountry"]) ? (
              <p className="m-0" key="error-refereeCompanyCountry">
                {error["refereeCompanyCountry"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refereeContactNoHome">Referee Contact Number Home:</label>
                <InputText id="refereeContactNoHome" className="w-full mb-3 p-inputtext-sm" value={_entity?.refereeContactNoHome} onChange={(e) => setValByKey("refereeContactNoHome", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refereeContactNoHome"]) ? (
              <p className="m-0" key="error-refereeContactNoHome">
                {error["refereeContactNoHome"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="refereeContactNoMobile">Referee Contact Number Mobile:</label>
                <InputText id="refereeContactNoMobile" className="w-full mb-3 p-inputtext-sm" value={_entity?.refereeContactNoMobile} onChange={(e) => setValByKey("refereeContactNoMobile", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["refereeContactNoMobile"]) ? (
              <p className="m-0" key="error-refereeContactNoMobile">
                {error["refereeContactNoMobile"]}
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

export default connect(mapState, mapDispatch)(RefereesCreateDialogComponent);
