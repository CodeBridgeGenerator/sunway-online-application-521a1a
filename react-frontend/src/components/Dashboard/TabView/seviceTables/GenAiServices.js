import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import client from "../../../../services/restClient";
import { TabView, TabPanel } from "primereact/tabview";

const CompanyServices = (props) => {
  const [companyData, setCompanyData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Track active tab

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeIndex === 0) {
          // Fetch companies data
          const res = await client
            .service("prompts")
            .find({ query: { $limit: 5 } });
          setCompanyData(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeIndex, props]);

  const dropdownTemplate0 = (rowData, { rowIndex }) => (
    <p>{rowData.companyId?.name}</p>
  );

  return (
    <TabView
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    >
      <TabPanel header="Prompts">
        <div className="companies-table">
          {loading ? (
            <ProgressSpinner />
          ) : (
            <DataTable value={companyData} rows={5}>
              <Column field="prompt" header="Prompt" sortable />
              <Column field="type" header="Type" sortable />
              <Column field="role" header="Role" sortable />
              <Column field="model" header="Model" sortable />
            </DataTable>
          )}
        </div>
      </TabPanel>
    </TabView>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CompanyServices);
