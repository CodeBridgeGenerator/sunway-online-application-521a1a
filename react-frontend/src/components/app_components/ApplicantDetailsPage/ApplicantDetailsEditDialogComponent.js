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
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
const genderArray = [];
const genderOptions = genderArray.map((x) => ({ name: x, value: x }));
const maritalStatusArray = [];
const maritalStatusOptions = maritalStatusArray.map((x) => ({ name: x, value: x }));
const religionArray = [];
const religionOptions = religionArray.map((x) => ({ name: x, value: x }));
const specialCondtionsArray = [];
const specialCondtionsOptions = specialCondtionsArray.map((x) => ({ name: x, value: x }));
const immigrationPassTypeArray = [];
const immigrationPassTypeOptions = immigrationPassTypeArray.map((x) => ({ name: x, value: x }));
const malaysianEmbassyCountryArray = [];
const malaysianEmbassyCountryOptions = malaysianEmbassyCountryArray.map((x) => ({ name: x, value: x }));

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

const ApplicantDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [studentUser, setStudentUser] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount studentUser
                    client
                        .service("studentUser")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStudentUserId } })
                        .then((res) => {
                            setStudentUser(res.data.map((e) => { return { name: e['passport'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "StudentUser", type: "error", message: error.message || "Failed get studentUser" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            studentUser: _entity?.studentUser?._id,
fullName: _entity?.fullName,
firstName: _entity?.firstName,
surname: _entity?.surname,
nationality: _entity?.nationality,
passportNumber: _entity?.passportNumber,
passportExpiryDate: _entity?.passportExpiryDate,
dateOfBirth: _entity?.dateOfBirth,
gender: _entity?.gender,
maritalStatus: _entity?.maritalStatus,
religion: _entity?.religion,
isSpecialConditions: _entity?.isSpecialConditions,
specialCondtions: _entity?.specialCondtions,
isFormerStudent: _entity?.isFormerStudent,
studentId: _entity?.studentId,
isHoldValidMalaysianVisa: _entity?.isHoldValidMalaysianVisa,
immigrationPassType: _entity?.immigrationPassType,
studentPassExpiryDate: _entity?.studentPassExpiryDate,
institutionEnrolled: _entity?.institutionEnrolled,
malaysianEmbassyCity: _entity?.malaysianEmbassyCity,
malaysianEmbassyCountry: _entity?.malaysianEmbassyCountry,
        };

        setLoading(true);
        try {
            
        await client.service("applicantDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("applicantDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "studentUser",
                    service : "studentUser",
                    select:["passport"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info applicantDetails updated successfully" });
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

    const studentUserOptions = studentUser.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit ApplicantDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="applicantDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentUser">Student User:</label>
                <Dropdown id="studentUser" value={_entity?.studentUser?._id} optionLabel="name" optionValue="value" options={studentUserOptions} onChange={(e) => setValByKey("studentUser", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentUser"]) && (
              <p className="m-0" key="error-studentUser">
                {error["studentUser"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fullName">Full Name:</label>
                <InputText id="fullName" className="w-full mb-3 p-inputtext-sm" value={_entity?.fullName} onChange={(e) => setValByKey("fullName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fullName"]) && (
              <p className="m-0" key="error-fullName">
                {error["fullName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="firstName">First Name:</label>
                <InputText id="firstName" className="w-full mb-3 p-inputtext-sm" value={_entity?.firstName} onChange={(e) => setValByKey("firstName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["firstName"]) && (
              <p className="m-0" key="error-firstName">
                {error["firstName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="surname">Surname:</label>
                <InputText id="surname" className="w-full mb-3 p-inputtext-sm" value={_entity?.surname} onChange={(e) => setValByKey("surname", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["surname"]) && (
              <p className="m-0" key="error-surname">
                {error["surname"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="nationality">Nationality:</label>
                <InputText id="nationality" className="w-full mb-3 p-inputtext-sm" value={_entity?.nationality} onChange={(e) => setValByKey("nationality", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nationality"]) && (
              <p className="m-0" key="error-nationality">
                {error["nationality"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="passportNumber">Passport Number:</label>
                <InputText id="passportNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.passportNumber} onChange={(e) => setValByKey("passportNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["passportNumber"]) && (
              <p className="m-0" key="error-passportNumber">
                {error["passportNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="passportExpiryDate">Passport Expiry Date:</label>
                <Calendar id="passportExpiryDate" value={_entity?.passportExpiryDate ? new Date(_entity?.passportExpiryDate) : null} onChange={ (e) => setValByKey("passportExpiryDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["passportExpiryDate"]) && (
              <p className="m-0" key="error-passportExpiryDate">
                {error["passportExpiryDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <Calendar id="dateOfBirth" value={_entity?.dateOfBirth ? new Date(_entity?.dateOfBirth) : null} onChange={ (e) => setValByKey("dateOfBirth", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateOfBirth"]) && (
              <p className="m-0" key="error-dateOfBirth">
                {error["dateOfBirth"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="gender">Gender:</label>
                <Dropdown id="gender" value={_entity?.gender} options={genderOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("gender", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["gender"]) && (
              <p className="m-0" key="error-gender">
                {error["gender"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="maritalStatus">Marital Status:</label>
                <Dropdown id="maritalStatus" value={_entity?.maritalStatus} options={maritalStatusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("maritalStatus", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["maritalStatus"]) && (
              <p className="m-0" key="error-maritalStatus">
                {error["maritalStatus"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="religion">Religion:</label>
                <Dropdown id="religion" value={_entity?.religion} options={religionOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("religion", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["religion"]) && (
              <p className="m-0" key="error-religion">
                {error["religion"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isSpecialConditions">Is Special Conditions:</label>
                <Checkbox id="isSpecialConditions" className="ml-3" checked={_entity?.isSpecialConditions} onChange={ (e) => setValByKey("isSpecialConditions", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isSpecialConditions"]) && (
              <p className="m-0" key="error-isSpecialConditions">
                {error["isSpecialConditions"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="specialCondtions">Special Condtions:</label>
                <Dropdown id="specialCondtions" value={_entity?.specialCondtions} options={specialCondtionsOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("specialCondtions", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["specialCondtions"]) && (
              <p className="m-0" key="error-specialCondtions">
                {error["specialCondtions"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isFormerStudent">Is Former Student:</label>
                <Checkbox id="isFormerStudent" className="ml-3" checked={_entity?.isFormerStudent} onChange={ (e) => setValByKey("isFormerStudent", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isFormerStudent"]) && (
              <p className="m-0" key="error-isFormerStudent">
                {error["isFormerStudent"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentId">Student Id:</label>
                <InputText id="studentId" className="w-full mb-3 p-inputtext-sm" value={_entity?.studentId} onChange={(e) => setValByKey("studentId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentId"]) && (
              <p className="m-0" key="error-studentId">
                {error["studentId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isHoldValidMalaysianVisa">Is Hold Valid Malaysian Visa:</label>
                <Checkbox id="isHoldValidMalaysianVisa" className="ml-3" checked={_entity?.isHoldValidMalaysianVisa} onChange={ (e) => setValByKey("isHoldValidMalaysianVisa", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isHoldValidMalaysianVisa"]) && (
              <p className="m-0" key="error-isHoldValidMalaysianVisa">
                {error["isHoldValidMalaysianVisa"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="immigrationPassType">Immigration Pass Type:</label>
                <Dropdown id="immigrationPassType" value={_entity?.immigrationPassType} options={immigrationPassTypeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("immigrationPassType", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["immigrationPassType"]) && (
              <p className="m-0" key="error-immigrationPassType">
                {error["immigrationPassType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentPassExpiryDate">Student Pass Expiry Date:</label>
                <Calendar id="studentPassExpiryDate" value={_entity?.studentPassExpiryDate ? new Date(_entity?.studentPassExpiryDate) : null} onChange={ (e) => setValByKey("studentPassExpiryDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentPassExpiryDate"]) && (
              <p className="m-0" key="error-studentPassExpiryDate">
                {error["studentPassExpiryDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="institutionEnrolled">Institution Enrolled:</label>
                <InputText id="institutionEnrolled" className="w-full mb-3 p-inputtext-sm" value={_entity?.institutionEnrolled} onChange={(e) => setValByKey("institutionEnrolled", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["institutionEnrolled"]) && (
              <p className="m-0" key="error-institutionEnrolled">
                {error["institutionEnrolled"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="malaysianEmbassyCity">City:</label>
                <InputText id="malaysianEmbassyCity" className="w-full mb-3 p-inputtext-sm" value={_entity?.malaysianEmbassyCity} onChange={(e) => setValByKey("malaysianEmbassyCity", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["malaysianEmbassyCity"]) && (
              <p className="m-0" key="error-malaysianEmbassyCity">
                {error["malaysianEmbassyCity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="malaysianEmbassyCountry">Country:</label>
                <Dropdown id="malaysianEmbassyCountry" value={_entity?.malaysianEmbassyCountry} options={malaysianEmbassyCountryOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("malaysianEmbassyCountry", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["malaysianEmbassyCountry"]) && (
              <p className="m-0" key="error-malaysianEmbassyCountry">
                {error["malaysianEmbassyCountry"]}
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

export default connect(mapState, mapDispatch)(ApplicantDetailsCreateDialogComponent);
