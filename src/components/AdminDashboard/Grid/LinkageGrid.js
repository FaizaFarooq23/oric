import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/router";
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

export default function LinkageGrid({ linkageData}) {
  const gridRef = useRef();
  const router = useRouter();
  const [colDefs] = useState([
    { field: "username", filter: true, headerName: "Username" },
    { field: "Type_of_Linkage", filter: true, headerName: "Type of Linkage" },
    { field: "Feild_of_Study", filter: true, headerName: "Field of Study" },
    { field: "Nationality", filter: true, headerName: "Nationality" },
    { field: "Name_of_Research_Grant", filter: true, headerName: "Research Grant" },
    {
      field: "Date_of_Agreement",
      filter: "agDateColumnFilter",
      headerName: "Date of Agreement",
      filterParams: filterParams,
      valueFormatter: (params) => params.value?.split("T")[0],
    },
    { field: "Name_of_Host_Institute", filter: true, headerName: "Host Institute" },
    { field: "Address_of_Host_Institute", filter: true, headerName: "Host Institute Address" },
    { field: "Collaborating_Agency", filter: true, headerName: "Collaborating Agency" },
    { field: "Collaborating_Agency_Address", filter: true, headerName: "Collaborating Agency Address" },
    { field: "Scope", filter: true, headerName: "Scope" },
    { field: "Features", filter: true, headerName: "Features" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/handler?project_id=${router.query.project_id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (router.query.project_id) {
      fetchData();
    }
  }, [router.query.project_id]);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const result = selectedRows.length === 1 ? selectedRows[0].id : "";
    const name = selectedRows.length === 1 ? selectedRows[0].username : "";
    router.push(`/linkage/${result}/${name}`);
  }, [router]);

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
          rowData={linkageData}
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
