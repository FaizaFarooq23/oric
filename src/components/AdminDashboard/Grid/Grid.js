import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/navigation";

import React, { useCallback, useEffect, useRef, useState } from "react";

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
export default function Grid({ data }) {
  const gridRef = useRef();
  const router = useRouter();
  const [colDefs] = useState([
    { field: "Name_of_pi", filter: true, headerName: "Name of PI" },
    { field: "title", filter: true, headerName: "Project Title" },
    { field: "Thematic_Area", filter: true, headerName: "Thematic Area" },
    { field: "funding_agency", filter: true, headerName: "Funding Agency" },
    {
      field: "funding_utilized",
      headerName: "Funding Amount",
      filter: "agNumberColumnFilter",
    },
    { field: "category", filter: true, headerName: "Project Type" },
    {
      field: "start_Date",
      filter: "agDateColumnFilter",
      headerName: "Start Date",
      filterParams: filterParams,
      valueFormatter: (params) => params.value?.split("T")[0],
    },
    {
      field: "end_Date",
      filter: "agDateColumnFilter",
      headerName: "End Date",
      filterParams: filterParams,
      valueFormatter: (params) => params.value?.split("T")[0],
    },
    {
      field: "Status_of_proposal",
      filter: true,
      headerName: "Proposal Status",
    },
    { field: "Status_of_project", filter: true, headerName: "Project Status" },
    { field: "Department_of_Pi", filter: true, headerName: "Department" },
    {
      field: "Date_of_Submission",
      filter: "agDateColumnFilter",
      headerName: "Date of Submission",
      filterParams: filterParams,
      valueFormatter: (params) => params.value?.split("T")[0],
    },
    {
      field: "funding_approved",
      filter: "agNumberColumnFilter",
      headerName: "Funding Approved",
    },
    {
      field: "funding_utilized",
      headerName: "Funding Utilized",
      filter: "agNumberColumnFilter",
    },
    {
      field: "funding_remaining",
      headerName: "Funding Remaining",
      filter: "agNumberColumnFilter",
    },
  ]);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const result = selectedRows.length === 1 ? selectedRows[0].project_id : "";
    const name = selectedRows.length === 1 ? selectedRows[0].title : "";
    router.push(`/project/${result}/${name}`);
  }, []);



  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="flex flex-col gap-y-8 ">
      <div className="flex items-center justify-between ">
        <div className=" text-blue-900 font-bold text-2xl">
          {" "}
          
        </div>
        <button
          className="bg-blue-900 hover:button-gradient hover:bg-gradient-to-r from-blue-900 to-[#3e92cc]  cursor-pointer text-white font-semibold text-lg py-2 px-4 rounded-lg "
          onClick={onBtnExport}
        >
          Download CSV export file
        </button>
      </div>
      <div
        className={"ag-theme-quartz"}
        style={{ width: "100%", height: "600px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={colDefs}
          suppressExcelExport={true}
          rowSelection={"single"}
          suppressHorizontalScroll={true}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
}
