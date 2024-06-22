import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/navigation";
import { CsvExportModule } from "@ag-grid-community/csv-export";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Casestudydata from "@/components/FacultyDashboard/ResearchExcellence/Forms/CaseStudy/Casestudydata";

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
export default function CaseStudyGrid() {
  const gridRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const router = useRouter();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [colDefs] = useState([
    { field: "username", filter: true, headerName: "Username" },
    { field: "Name_of_Government_Body", filter: true, headerName: "Government Body" },
    { field: "Advocacy_tools", filter: true, headerName: "Advocacy Tools" },
    { field: "Area_advocated", filter: true, headerName: "Area Advocated" },
    {
      field: "Date_of_presentation",
      filter: "agDateColumnFilter",
      headerName: "Date of Presentation",
      filterParams: filterParams,
      valueFormatter: (params) => params.value?.split("T")[0],
    },
    { field: "Banking_research_status", filter: true, headerName: "Research Status" },
    { field: "Coalation_Partner", filter: true, headerName: "Coalition Partner" },
    { field: "Breif_Details", filter: true, headerName: "Brief Details" },
    { field: "Issue_verification", filter: true, headerName: "Issue Verification" },
    { field: "Name_of_Pi", filter: true, headerName: "Name of Pi" },
    { field: "Department_of_Pi", filter: true, headerName: "Department of Pi" },
    { field: "Designation_of_Pi", filter: true, headerName: "Designation of Pi" },
  ]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/stats/research-excellence-api/get_case_study');  
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
      </div>


      {
        selectedRow &&
        <Casestudydata isOpen={isModalOpen} closeModal={closeModal} data={selectedRow} admin={true} />
      }
    </div>
  );
}
