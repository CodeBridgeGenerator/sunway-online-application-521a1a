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
import { Checkbox } from "primereact/checkbox";
const correspondenceCountryArray = [];
const correspondenceCountryOptions = correspondenceCountryArray.map((x) => ({ name: x, value: x }));
const stateProvinceArray = [];
const stateProvinceOptions = stateProvinceArray.map((x) => ({ name: x, value: x }));
const permanentCountryArray = [];
const permanentCountryOptions = permanentCountryArray.map((x) => ({ name: x, value: x }));
const parentRelationshipArray = [];
const parentRelationshipOptions = parentRelationshipArray.map((x) => ({ name: x, value: x }));
const monthlyHousholdIncomeArray = [];
const monthlyHousholdIncomeOptions = monthlyHousholdIncomeArray.map((x) => ({ name: x, value: x }));
const emergencyRelationshipArray = [];
const emergencyRelationshipOptions = emergencyRelationshipArray.map((x) => ({ name: x, value: x }));

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

const ContactDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [applicant, setApplicant] = useState([])

    useEffect(() => {
        let init  = {isSameAsCorrespondenceAddress: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [applicant], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.fullCorrespondenceAddress)) {
                error["fullCorrespondenceAddress"] = `Full Correspondence Address field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.correspondenceCityTown)) {
                error["correspondenceCityTown"] = `City/Town field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.correspondencePostalCode)) {
                error["correspondencePostalCode"] = `Postal Code field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.studentMobileNumber)) {
                error["studentMobileNumber"] = `Student's Mobile Number field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.correspondenceHomeContactNo)) {
                error["correspondenceHomeContactNo"] = `Home Contact Number field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.studentEmail)) {
                error["studentEmail"] = `Student's Email field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.fullPermanentAddress)) {
                error["fullPermanentAddress"] = `Full Permanent Address field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.permanentCityTown)) {
                error["permanentCityTown"] = `City/Town field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.permanentPostalCode)) {
                error["permanentPostalCode"] = `Postal Code field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.permanentContactNo)) {
                error["permanentContactNo"] = `Home/Mobile Contact Number field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.parentName)) {
                error["parentName"] = `Name (as per NRIC/Passport) field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.parentMobileNo)) {
                error["parentMobileNo"] = `Mobile No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.parentHomeNo)) {
                error["parentHomeNo"] = `Home No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.parentEmail)) {
                error["parentEmail"] = `Email field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.parentOfficeNo)) {
                error["parentOfficeNo"] = `OfficeNo field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.emergencyName)) {
                error["emergencyName"] = `Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.emergencyMobileNo)) {
                error["emergencyMobileNo"] = `Mobile No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.emergencyHomeNo)) {
                error["emergencyHomeNo"] = `Home No field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.emergencyEmail)) {
                error["emergencyEmail"] = `Email field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.emergencyOfficeNo)) {
                error["emergencyOfficeNo"] = `Office No field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            applicant: _entity?.applicant?._id,fullCorrespondenceAddress: _entity?.fullCorrespondenceAddress,correspondenceCityTown: _entity?.correspondenceCityTown,correspondencePostalCode: _entity?.correspondencePostalCode,correspondenceCountry: _entity?.correspondenceCountry,studentMobileNumber: _entity?.studentMobileNumber,correspondenceHomeContactNo: _entity?.correspondenceHomeContactNo,studentEmail: _entity?.studentEmail,isSameAsCorrespondenceAddress: _entity?.isSameAsCorrespondenceAddress || false,fullPermanentAddress: _entity?.fullPermanentAddress,permanentCityTown: _entity?.permanentCityTown,permanentPostalCode: _entity?.permanentPostalCode,stateProvince: _entity?.stateProvince,permanentCountry: _entity?.permanentCountry,permanentContactNo: _entity?.permanentContactNo,parentName: _entity?.parentName,parentRelationship: _entity?.parentRelationship,parentMobileNo: _entity?.parentMobileNo,parentHomeNo: _entity?.parentHomeNo,parentEmail: _entity?.parentEmail,parentOfficeNo: _entity?.parentOfficeNo,monthlyHousholdIncome: _entity?.monthlyHousholdIncome,emergencyName: _entity?.emergencyName,emergencyRelationship: _entity?.emergencyRelationship,emergencyMobileNo: _entity?.emergencyMobileNo,emergencyHomeNo: _entity?.emergencyHomeNo,emergencyEmail: _entity?.emergencyEmail,emergencyOfficeNo: _entity?.emergencyOfficeNo,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("contactDetails").create(_data);
        const eagerResult = await client
            .service("contactDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "applicant",
                    service : "applicantDetails",
                    select:["fullName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Contact Details updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Contact Details" });
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
        <Dialog header="Create Contact Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="contactDetails-create-dialog-component">
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
                <label htmlFor="fullCorrespondenceAddress">Full Correspondence Address:</label>
                <InputText id="fullCorrespondenceAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.fullCorrespondenceAddress} onChange={(e) => setValByKey("fullCorrespondenceAddress", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fullCorrespondenceAddress"]) ? (
              <p className="m-0" key="error-fullCorrespondenceAddress">
                {error["fullCorrespondenceAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="correspondenceCityTown">City/Town:</label>
                <InputText id="correspondenceCityTown" className="w-full mb-3 p-inputtext-sm" value={_entity?.correspondenceCityTown} onChange={(e) => setValByKey("correspondenceCityTown", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["correspondenceCityTown"]) ? (
              <p className="m-0" key="error-correspondenceCityTown">
                {error["correspondenceCityTown"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="correspondencePostalCode">Postal Code:</label>
                <InputText id="correspondencePostalCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.correspondencePostalCode} onChange={(e) => setValByKey("correspondencePostalCode", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["correspondencePostalCode"]) ? (
              <p className="m-0" key="error-correspondencePostalCode">
                {error["correspondencePostalCode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="correspondenceCountry">Country:</label>
                <Dropdown id="correspondenceCountry" value={_entity?.correspondenceCountry} options={correspondenceCountryOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("correspondenceCountry", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["correspondenceCountry"]) ? (
              <p className="m-0" key="error-correspondenceCountry">
                {error["correspondenceCountry"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentMobileNumber">Student's Mobile Number:</label>
                <InputText id="studentMobileNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.studentMobileNumber} onChange={(e) => setValByKey("studentMobileNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentMobileNumber"]) ? (
              <p className="m-0" key="error-studentMobileNumber">
                {error["studentMobileNumber"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="correspondenceHomeContactNo">Home Contact Number:</label>
                <InputText id="correspondenceHomeContactNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.correspondenceHomeContactNo} onChange={(e) => setValByKey("correspondenceHomeContactNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["correspondenceHomeContactNo"]) ? (
              <p className="m-0" key="error-correspondenceHomeContactNo">
                {error["correspondenceHomeContactNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentEmail">Student's Email:</label>
                <InputText id="studentEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.studentEmail} onChange={(e) => setValByKey("studentEmail", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentEmail"]) ? (
              <p className="m-0" key="error-studentEmail">
                {error["studentEmail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="isSameAsCorrespondenceAddress">IsSameAsCorrespondence Address:</label>
                <Checkbox id="isSameAsCorrespondenceAddress" className="ml-3" checked={_entity?.isSameAsCorrespondenceAddress} onChange={ (e) => setValByKey("isSameAsCorrespondenceAddress", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["isSameAsCorrespondenceAddress"]) ? (
              <p className="m-0" key="error-isSameAsCorrespondenceAddress">
                {error["isSameAsCorrespondenceAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fullPermanentAddress">Full Permanent Address:</label>
                <InputText id="fullPermanentAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.fullPermanentAddress} onChange={(e) => setValByKey("fullPermanentAddress", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fullPermanentAddress"]) ? (
              <p className="m-0" key="error-fullPermanentAddress">
                {error["fullPermanentAddress"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="permanentCityTown">City/Town:</label>
                <InputText id="permanentCityTown" className="w-full mb-3 p-inputtext-sm" value={_entity?.permanentCityTown} onChange={(e) => setValByKey("permanentCityTown", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["permanentCityTown"]) ? (
              <p className="m-0" key="error-permanentCityTown">
                {error["permanentCityTown"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="permanentPostalCode">Postal Code:</label>
                <InputText id="permanentPostalCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.permanentPostalCode} onChange={(e) => setValByKey("permanentPostalCode", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["permanentPostalCode"]) ? (
              <p className="m-0" key="error-permanentPostalCode">
                {error["permanentPostalCode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stateProvince">State/Province:</label>
                <Dropdown id="stateProvince" value={_entity?.stateProvince} options={stateProvinceOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("stateProvince", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stateProvince"]) ? (
              <p className="m-0" key="error-stateProvince">
                {error["stateProvince"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="permanentCountry">Country:</label>
                <Dropdown id="permanentCountry" value={_entity?.permanentCountry} options={permanentCountryOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("permanentCountry", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["permanentCountry"]) ? (
              <p className="m-0" key="error-permanentCountry">
                {error["permanentCountry"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="permanentContactNo">Home/Mobile Contact Number:</label>
                <InputText id="permanentContactNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.permanentContactNo} onChange={(e) => setValByKey("permanentContactNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["permanentContactNo"]) ? (
              <p className="m-0" key="error-permanentContactNo">
                {error["permanentContactNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentName">Name (as per NRIC/Passport):</label>
                <InputText id="parentName" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentName} onChange={(e) => setValByKey("parentName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentName"]) ? (
              <p className="m-0" key="error-parentName">
                {error["parentName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentRelationship">Relationship:</label>
                <Dropdown id="parentRelationship" value={_entity?.parentRelationship} options={parentRelationshipOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("parentRelationship", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentRelationship"]) ? (
              <p className="m-0" key="error-parentRelationship">
                {error["parentRelationship"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentMobileNo">Mobile No:</label>
                <InputText id="parentMobileNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentMobileNo} onChange={(e) => setValByKey("parentMobileNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentMobileNo"]) ? (
              <p className="m-0" key="error-parentMobileNo">
                {error["parentMobileNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentHomeNo">Home No:</label>
                <InputText id="parentHomeNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentHomeNo} onChange={(e) => setValByKey("parentHomeNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentHomeNo"]) ? (
              <p className="m-0" key="error-parentHomeNo">
                {error["parentHomeNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentEmail">Email:</label>
                <InputText id="parentEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentEmail} onChange={(e) => setValByKey("parentEmail", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentEmail"]) ? (
              <p className="m-0" key="error-parentEmail">
                {error["parentEmail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentOfficeNo">OfficeNo:</label>
                <InputText id="parentOfficeNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentOfficeNo} onChange={(e) => setValByKey("parentOfficeNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentOfficeNo"]) ? (
              <p className="m-0" key="error-parentOfficeNo">
                {error["parentOfficeNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="monthlyHousholdIncome">Monthly Houshold Income:</label>
                <Dropdown id="monthlyHousholdIncome" value={_entity?.monthlyHousholdIncome} options={monthlyHousholdIncomeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("monthlyHousholdIncome", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["monthlyHousholdIncome"]) ? (
              <p className="m-0" key="error-monthlyHousholdIncome">
                {error["monthlyHousholdIncome"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyName">Name:</label>
                <InputText id="emergencyName" className="w-full mb-3 p-inputtext-sm" value={_entity?.emergencyName} onChange={(e) => setValByKey("emergencyName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyName"]) ? (
              <p className="m-0" key="error-emergencyName">
                {error["emergencyName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyRelationship">Relationship:</label>
                <Dropdown id="emergencyRelationship" value={_entity?.emergencyRelationship} options={emergencyRelationshipOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("emergencyRelationship", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyRelationship"]) ? (
              <p className="m-0" key="error-emergencyRelationship">
                {error["emergencyRelationship"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyMobileNo">Mobile No:</label>
                <InputText id="emergencyMobileNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.emergencyMobileNo} onChange={(e) => setValByKey("emergencyMobileNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyMobileNo"]) ? (
              <p className="m-0" key="error-emergencyMobileNo">
                {error["emergencyMobileNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyHomeNo">Home No:</label>
                <InputText id="emergencyHomeNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.emergencyHomeNo} onChange={(e) => setValByKey("emergencyHomeNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyHomeNo"]) ? (
              <p className="m-0" key="error-emergencyHomeNo">
                {error["emergencyHomeNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyEmail">Email:</label>
                <InputText id="emergencyEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.emergencyEmail} onChange={(e) => setValByKey("emergencyEmail", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyEmail"]) ? (
              <p className="m-0" key="error-emergencyEmail">
                {error["emergencyEmail"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyOfficeNo">Office No:</label>
                <InputText id="emergencyOfficeNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.emergencyOfficeNo} onChange={(e) => setValByKey("emergencyOfficeNo", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyOfficeNo"]) ? (
              <p className="m-0" key="error-emergencyOfficeNo">
                {error["emergencyOfficeNo"]}
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

export default connect(mapState, mapDispatch)(ContactDetailsCreateDialogComponent);
