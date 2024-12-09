import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const ApplicantDetailsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.studentUser?.passport}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.fullName}</p>
const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.firstName}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.surname}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.nationality}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.passportNumber}</p>
const p_calendarTemplate6 = (rowData, { rowIndex }) => <p >{rowData.passportExpiryDate}</p>
const p_calendarTemplate7 = (rowData, { rowIndex }) => <p >{rowData.dateOfBirth}</p>
const dropdownArrayTemplate8 = (rowData, { rowIndex }) => <p >{rowData.gender}</p>
const dropdownArrayTemplate9 = (rowData, { rowIndex }) => <p >{rowData.maritalStatus}</p>
const dropdownArrayTemplate10 = (rowData, { rowIndex }) => <p >{rowData.religion}</p>
const checkboxTemplate11 = (rowData, { rowIndex }) => <Checkbox checked={rowData.isSpecialConditions}  />
const dropdownArrayTemplate12 = (rowData, { rowIndex }) => <p >{rowData.specialCondtions}</p>
const checkboxTemplate13 = (rowData, { rowIndex }) => <Checkbox checked={rowData.isFormerStudent}  />
const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.studentId}</p>
const checkboxTemplate15 = (rowData, { rowIndex }) => <Checkbox checked={rowData.isHoldValidMalaysianVisa}  />
const dropdownArrayTemplate16 = (rowData, { rowIndex }) => <p >{rowData.immigrationPassType}</p>
const p_calendarTemplate17 = (rowData, { rowIndex }) => <p >{rowData.studentPassExpiryDate}</p>
const pTemplate18 = (rowData, { rowIndex }) => <p >{rowData.institutionEnrolled}</p>
const pTemplate19 = (rowData, { rowIndex }) => <p >{rowData.malaysianEmbassyCity}</p>
const dropdownArrayTemplate20 = (rowData, { rowIndex }) => <p >{rowData.malaysianEmbassyCountry}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="studentUser" header="Student User" body={dropdownTemplate0} filter={selectedFilterFields.includes("studentUser")} hidden={selectedHideFields?.includes("studentUser")}  style={{ minWidth: "8rem" }} />
<Column field="fullName" header="Full Name" body={pTemplate1} filter={selectedFilterFields.includes("fullName")} hidden={selectedHideFields?.includes("fullName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="firstName" header="First Name" body={pTemplate2} filter={selectedFilterFields.includes("firstName")} hidden={selectedHideFields?.includes("firstName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="surname" header="Surname" body={pTemplate3} filter={selectedFilterFields.includes("surname")} hidden={selectedHideFields?.includes("surname")}  sortable style={{ minWidth: "8rem" }} />
<Column field="nationality" header="Nationality" body={pTemplate4} filter={selectedFilterFields.includes("nationality")} hidden={selectedHideFields?.includes("nationality")}  sortable style={{ minWidth: "8rem" }} />
<Column field="passportNumber" header="Passport Number" body={pTemplate5} filter={selectedFilterFields.includes("passportNumber")} hidden={selectedHideFields?.includes("passportNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="passportExpiryDate" header="Passport Expiry Date" body={p_calendarTemplate6} filter={selectedFilterFields.includes("passportExpiryDate")} hidden={selectedHideFields?.includes("passportExpiryDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="dateOfBirth" header="Date Of Birth" body={p_calendarTemplate7} filter={selectedFilterFields.includes("dateOfBirth")} hidden={selectedHideFields?.includes("dateOfBirth")}  sortable style={{ minWidth: "8rem" }} />
<Column field="gender" header="Gender" body={dropdownArrayTemplate8} filter={selectedFilterFields.includes("gender")} hidden={selectedHideFields?.includes("gender")}  style={{ minWidth: "8rem" }} />
<Column field="maritalStatus" header="Marital Status" body={dropdownArrayTemplate9} filter={selectedFilterFields.includes("maritalStatus")} hidden={selectedHideFields?.includes("maritalStatus")}  style={{ minWidth: "8rem" }} />
<Column field="religion" header="Religion" body={dropdownArrayTemplate10} filter={selectedFilterFields.includes("religion")} hidden={selectedHideFields?.includes("religion")}  style={{ minWidth: "8rem" }} />
<Column field="isSpecialConditions" header="Is Special Conditions" body={checkboxTemplate11} filter={selectedFilterFields.includes("isSpecialConditions")} hidden={selectedHideFields?.includes("isSpecialConditions")}  style={{ minWidth: "8rem" }} />
<Column field="specialCondtions" header="Special Condtions" body={dropdownArrayTemplate12} filter={selectedFilterFields.includes("specialCondtions")} hidden={selectedHideFields?.includes("specialCondtions")}  style={{ minWidth: "8rem" }} />
<Column field="isFormerStudent" header="Is Former Student" body={checkboxTemplate13} filter={selectedFilterFields.includes("isFormerStudent")} hidden={selectedHideFields?.includes("isFormerStudent")}  style={{ minWidth: "8rem" }} />
<Column field="studentId" header="Student Id" body={pTemplate14} filter={selectedFilterFields.includes("studentId")} hidden={selectedHideFields?.includes("studentId")}  sortable style={{ minWidth: "8rem" }} />
<Column field="isHoldValidMalaysianVisa" header="Is Hold Valid Malaysian Visa" body={checkboxTemplate15} filter={selectedFilterFields.includes("isHoldValidMalaysianVisa")} hidden={selectedHideFields?.includes("isHoldValidMalaysianVisa")}  style={{ minWidth: "8rem" }} />
<Column field="immigrationPassType" header="Immigration Pass Type" body={dropdownArrayTemplate16} filter={selectedFilterFields.includes("immigrationPassType")} hidden={selectedHideFields?.includes("immigrationPassType")}  style={{ minWidth: "8rem" }} />
<Column field="studentPassExpiryDate" header="Student Pass Expiry Date" body={p_calendarTemplate17} filter={selectedFilterFields.includes("studentPassExpiryDate")} hidden={selectedHideFields?.includes("studentPassExpiryDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="institutionEnrolled" header="Institution Enrolled" body={pTemplate18} filter={selectedFilterFields.includes("institutionEnrolled")} hidden={selectedHideFields?.includes("institutionEnrolled")}  sortable style={{ minWidth: "8rem" }} />
<Column field="malaysianEmbassyCity" header="City" body={pTemplate19} filter={selectedFilterFields.includes("malaysianEmbassyCity")} hidden={selectedHideFields?.includes("malaysianEmbassyCity")}  sortable style={{ minWidth: "8rem" }} />
<Column field="malaysianEmbassyCountry" header="Country" body={dropdownArrayTemplate20} filter={selectedFilterFields.includes("malaysianEmbassyCountry")} hidden={selectedHideFields?.includes("malaysianEmbassyCountry")}  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload ApplicantDetails Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="applicantDetails"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search ApplicantDetails" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ApplicantDetailsDataTable;