import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/navigation";
import { CsvExportModule } from "@ag-grid-community/csv-export";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Product_Displayeddata from "@/components/FacultyDashboard/ResearchExcellence/Forms/ResearchProducts/ProductDisplayedData";

const today = new Date();

var filterParams = {
  minValidDate: "1998-01-08",
  maxValidDate: "2050-01-01",
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("T")[0].split("-");
    var cellDate = new Date(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

// Create new GridExample component
export default function DeployedProjectsGrid() {
  const gridRef = useRef();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [selectedRow, setSelectedRow] = useState();

  const [data, setData] = useState([]);
  const [colDefs] = useState([
    { field: "username", filter: true, headerName: "Email" },
    { field: "Name_of_lead", filter: true, headerName: "Lead" },
    { field: "Designation_of_lead", filter: true, headerName: "Designation" },
    { field: "Department_of_lead", filter: true, headerName: "Department" },
    { field: "Title", filter: true, headerName: "Title" },
    { field: "Category", filter: true, headerName: "Category" },
    { field: "Feild_of_use", filter: true, headerName: "Field of Use" },
    { field: "Name_of_Forum", filter: true, headerName: "Forum Name" },
    { field: "Detail_of_Forum", filter: true, headerName: "Forum Details" },
    { field: "Financial_support", filter: true, headerName: "Financial Support" },
    { field: "Nationality", filter: true, headerName: "Nationality" },
    { field: "Status", filter: true, headerName: "Status" },
])
  const fetchData = async () => {
    try {
      const response = await fetch('/api/stats/ip_and_commercialization/get_projects_deployed'); 
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const result = selectedRows.length === 1 ? selectedRows[0].id : "";
    const name = selectedRows.length === 1 ? selectedRows[0].Name_of_Government_Body : "";
    setSelectedRow(selectedRows[0]);
    setIsModalOpen(true);
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <div className="text-blue-900 font-bold text-2xl"></div>
        <button
          className="bg-blue-900 hover:button-gradient hover:bg-gradient-to-r from-blue-900 to-[#3e92cc] cursor-pointer text-white font-semibold text-lg py-2 px-4 rounded-lg"
          onClick={onBtnExport}
        >
          Download CSV export file
        </button>
      </div>
      <div className={"ag-theme-quartz"} style={{ width: "100%", height: "600px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={colDefs}
          suppressExcelExport={true}
          rowSelection={"single"}
          suppressHorizontalScroll={true}
          onRowClicked={onSelectionChanged}
        />

        {selectedRow && 
          <Product_Displayeddata isOpen={isModalOpen} closeModal={closeModal} data={selectedRow} admin={true} />
        }
      </div>

      
    </div>
  );
}
