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
import { Calendar } from 'primereact/calendar';


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

const ProgrammesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            campus: _entity?.campus,
location: _entity?.location,
programmeLevel: _entity?.programmeLevel,
programme: _entity?.programme,
intake: _entity?.intake,
        };

        setLoading(true);
        try {
            
        const result = await client.service("programmes").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info programmes updated successfully" });
        props.onEditResult(result);
        
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

    

    return (
        <Dialog header="Edit Programmes" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="programmes-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="campus">Campus:</label>
                <InputText id="campus" className="w-full mb-3 p-inputtext-sm" value={_entity?.campus} onChange={(e) => setValByKey("campus", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["campus"]) && (
              <p className="m-0" key="error-campus">
                {error["campus"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="location">Location:</label>
                <InputText id="location" className="w-full mb-3 p-inputtext-sm" value={_entity?.location} onChange={(e) => setValByKey("location", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["location"]) && (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="programmeLevel">Programme Level:</label>
                <InputText id="programmeLevel" className="w-full mb-3 p-inputtext-sm" value={_entity?.programmeLevel} onChange={(e) => setValByKey("programmeLevel", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["programmeLevel"]) && (
              <p className="m-0" key="error-programmeLevel">
                {error["programmeLevel"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="programme">Programme:</label>
                <InputText id="programme" className="w-full mb-3 p-inputtext-sm" value={_entity?.programme} onChange={(e) => setValByKey("programme", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["programme"]) && (
              <p className="m-0" key="error-programme">
                {error["programme"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="intake">Intake:</label>
                <Calendar id="intake" value={_entity?.intake ? new Date(_entity?.intake) : null} onChange={ (e) => setValByKey("intake", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["intake"]) && (
              <p className="m-0" key="error-intake">
                {error["intake"]}
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

export default connect(mapState, mapDispatch)(ProgrammesCreateDialogComponent);
