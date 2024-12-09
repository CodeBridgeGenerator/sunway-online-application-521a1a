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

const ContactDetailsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.applicant?.fullName}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.fullCorrespondenceAddress}</p>
const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.correspondenceCityTown}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.correspondencePostalCode}</p>
const dropdownArrayTemplate4 = (rowData, { rowIndex }) => <p >{rowData.correspondenceCountry}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.studentMobileNumber}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.correspondenceHomeContactNo}</p>
const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.studentEmail}</p>
const checkboxTemplate8 = (rowData, { rowIndex }) => <Checkbox checked={rowData.isSameAsCorrespondenceAddress}  />
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.fullPermanentAddress}</p>
const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.permanentCityTown}</p>
const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.permanentPostalCode}</p>
const dropdownArrayTemplate12 = (rowData, { rowIndex }) => <p >{rowData.stateProvince}</p>
const dropdownArrayTemplate13 = (rowData, { rowIndex }) => <p >{rowData.permanentCountry}</p>
const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.permanentContactNo}</p>
const pTemplate15 = (rowData, { rowIndex }) => <p >{rowData.parentName}</p>
const dropdownArrayTemplate16 = (rowData, { rowIndex }) => <p >{rowData.parentRelationship}</p>
const pTemplate17 = (rowData, { rowIndex }) => <p >{rowData.parentMobileNo}</p>
const pTemplate18 = (rowData, { rowIndex }) => <p >{rowData.parentHomeNo}</p>
const pTemplate19 = (rowData, { rowIndex }) => <p >{rowData.parentEmail}</p>
const pTemplate20 = (rowData, { rowIndex }) => <p >{rowData.parentOfficeNo}</p>
const dropdownArrayTemplate21 = (rowData, { rowIndex }) => <p >{rowData.monthlyHousholdIncome}</p>
const pTemplate22 = (rowData, { rowIndex }) => <p >{rowData.emergencyName}</p>
const dropdownArrayTemplate23 = (rowData, { rowIndex }) => <p >{rowData.emergencyRelationship}</p>
const pTemplate24 = (rowData, { rowIndex }) => <p >{rowData.emergencyMobileNo}</p>
const pTemplate25 = (rowData, { rowIndex }) => <p >{rowData.emergencyHomeNo}</p>
const pTemplate26 = (rowData, { rowIndex }) => <p >{rowData.emergencyEmail}</p>
const pTemplate27 = (rowData, { rowIndex }) => <p >{rowData.emergencyOfficeNo}</p>
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
<Column field="applicant" header="Applicant" body={dropdownTemplate0} filter={selectedFilterFields.includes("applicant")} hidden={selectedHideFields?.includes("applicant")}  style={{ minWidth: "8rem" }} />
<Column field="fullCorrespondenceAddress" header="Full Correspondence Address" body={pTemplate1} filter={selectedFilterFields.includes("fullCorrespondenceAddress")} hidden={selectedHideFields?.includes("fullCorrespondenceAddress")}  sortable style={{ minWidth: "8rem" }} />
<Column field="correspondenceCityTown" header="City/Town" body={pTemplate2} filter={selectedFilterFields.includes("correspondenceCityTown")} hidden={selectedHideFields?.includes("correspondenceCityTown")}  sortable style={{ minWidth: "8rem" }} />
<Column field="correspondencePostalCode" header="Postal Code" body={pTemplate3} filter={selectedFilterFields.includes("correspondencePostalCode")} hidden={selectedHideFields?.includes("correspondencePostalCode")}  sortable style={{ minWidth: "8rem" }} />
<Column field="correspondenceCountry" header="Country" body={dropdownArrayTemplate4} filter={selectedFilterFields.includes("correspondenceCountry")} hidden={selectedHideFields?.includes("correspondenceCountry")}  style={{ minWidth: "8rem" }} />
<Column field="studentMobileNumber" header="Student's Mobile Number" body={pTemplate5} filter={selectedFilterFields.includes("studentMobileNumber")} hidden={selectedHideFields?.includes("studentMobileNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="correspondenceHomeContactNo" header="Home Contact Number" body={pTemplate6} filter={selectedFilterFields.includes("correspondenceHomeContactNo")} hidden={selectedHideFields?.includes("correspondenceHomeContactNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="studentEmail" header="Student's Email" body={pTemplate7} filter={selectedFilterFields.includes("studentEmail")} hidden={selectedHideFields?.includes("studentEmail")}  sortable style={{ minWidth: "8rem" }} />
<Column field="isSameAsCorrespondenceAddress" header="IsSameAsCorrespondence Address" body={checkboxTemplate8} filter={selectedFilterFields.includes("isSameAsCorrespondenceAddress")} hidden={selectedHideFields?.includes("isSameAsCorrespondenceAddress")}  style={{ minWidth: "8rem" }} />
<Column field="fullPermanentAddress" header="Full Permanent Address" body={pTemplate9} filter={selectedFilterFields.includes("fullPermanentAddress")} hidden={selectedHideFields?.includes("fullPermanentAddress")}  sortable style={{ minWidth: "8rem" }} />
<Column field="permanentCityTown" header="City/Town" body={pTemplate10} filter={selectedFilterFields.includes("permanentCityTown")} hidden={selectedHideFields?.includes("permanentCityTown")}  sortable style={{ minWidth: "8rem" }} />
<Column field="permanentPostalCode" header="Postal Code" body={pTemplate11} filter={selectedFilterFields.includes("permanentPostalCode")} hidden={selectedHideFields?.includes("permanentPostalCode")}  sortable style={{ minWidth: "8rem" }} />
<Column field="stateProvince" header="State/Province" body={dropdownArrayTemplate12} filter={selectedFilterFields.includes("stateProvince")} hidden={selectedHideFields?.includes("stateProvince")}  style={{ minWidth: "8rem" }} />
<Column field="permanentCountry" header="Country" body={dropdownArrayTemplate13} filter={selectedFilterFields.includes("permanentCountry")} hidden={selectedHideFields?.includes("permanentCountry")}  style={{ minWidth: "8rem" }} />
<Column field="permanentContactNo" header="Home/Mobile Contact Number" body={pTemplate14} filter={selectedFilterFields.includes("permanentContactNo")} hidden={selectedHideFields?.includes("permanentContactNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="parentName" header="Name (as per NRIC/Passport)" body={pTemplate15} filter={selectedFilterFields.includes("parentName")} hidden={selectedHideFields?.includes("parentName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="parentRelationship" header="Relationship" body={dropdownArrayTemplate16} filter={selectedFilterFields.includes("parentRelationship")} hidden={selectedHideFields?.includes("parentRelationship")}  style={{ minWidth: "8rem" }} />
<Column field="parentMobileNo" header="Mobile No" body={pTemplate17} filter={selectedFilterFields.includes("parentMobileNo")} hidden={selectedHideFields?.includes("parentMobileNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="parentHomeNo" header="Home No" body={pTemplate18} filter={selectedFilterFields.includes("parentHomeNo")} hidden={selectedHideFields?.includes("parentHomeNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="parentEmail" header="Email" body={pTemplate19} filter={selectedFilterFields.includes("parentEmail")} hidden={selectedHideFields?.includes("parentEmail")}  sortable style={{ minWidth: "8rem" }} />
<Column field="parentOfficeNo" header="OfficeNo" body={pTemplate20} filter={selectedFilterFields.includes("parentOfficeNo")} hidden={selectedHideFields?.includes("parentOfficeNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="monthlyHousholdIncome" header="Monthly Houshold Income" body={dropdownArrayTemplate21} filter={selectedFilterFields.includes("monthlyHousholdIncome")} hidden={selectedHideFields?.includes("monthlyHousholdIncome")}  style={{ minWidth: "8rem" }} />
<Column field="emergencyName" header="Name" body={pTemplate22} filter={selectedFilterFields.includes("emergencyName")} hidden={selectedHideFields?.includes("emergencyName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="emergencyRelationship" header="Relationship" body={dropdownArrayTemplate23} filter={selectedFilterFields.includes("emergencyRelationship")} hidden={selectedHideFields?.includes("emergencyRelationship")}  style={{ minWidth: "8rem" }} />
<Column field="emergencyMobileNo" header="Mobile No" body={pTemplate24} filter={selectedFilterFields.includes("emergencyMobileNo")} hidden={selectedHideFields?.includes("emergencyMobileNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="emergencyHomeNo" header="Home No" body={pTemplate25} filter={selectedFilterFields.includes("emergencyHomeNo")} hidden={selectedHideFields?.includes("emergencyHomeNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="emergencyEmail" header="Email" body={pTemplate26} filter={selectedFilterFields.includes("emergencyEmail")} hidden={selectedHideFields?.includes("emergencyEmail")}  sortable style={{ minWidth: "8rem" }} />
<Column field="emergencyOfficeNo" header="Office No" body={pTemplate27} filter={selectedFilterFields.includes("emergencyOfficeNo")} hidden={selectedHideFields?.includes("emergencyOfficeNo")}  sortable style={{ minWidth: "8rem" }} />
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


        <Dialog header="Upload ContactDetails Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="contactDetails"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search ContactDetails" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default ContactDetailsDataTable;