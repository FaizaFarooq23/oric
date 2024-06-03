import Product_to_Industrydata from "@/components/FacultyDashboard/ResearchExcellence/Forms/Product_to_Industry/Product_to_industryData";
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
export default function IndustrialGrid() {
  const gridRef = useRef();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [selectedRow, setSelectedRow] = useState();

  const [data, setData] = useState([]);
  const [colDefs] = useState([
    { field: "username", filter: true, headerName: "Email" },
    {
      field: "Name_of_leadInventor",
      filter: true,
      headerName: "Lead Inventor",
    },
    {
      field: "Designation_of_leadInventor",
      filter: true,
      headerName: "Designation",
    },
    {
      field: "Department_of_leadInventor",
      filter: true,
      headerName: "Department",
    },
    {
      field: "Title_of_Invention",
      filter: true,
      headerName: "Title of Invention",
    },
    { field: "Category", filter: true, headerName: "Category" },
    {
      field: "Development_Status",
      filter: true,
      headerName: "Development Status",
    },
    { field: "KeyAspects", filter: true, headerName: "Key Aspects" },
    {
      field: "Name_of_partner",
      filter: true,
      headerName: "Commercial Partner",
    },
    { field: "Detail_of_partner", filter: true, headerName: "Partner Details" },
    {
      field: "Financial_support",
      filter: true,
      headerName: "Financial Support",
    },
    {
      field: "Date_of_disclosure",
      filter: "agDateColumnFilter",
      headerName: "Date of Disclosure",
      filterParams: filterParams,
      valueFormatter: (params) => params.value?.split("T")[0],
    },
    {
      field: "Previous_disclosure",
      filter: true,
      headerName: "Previous Disclosure",
    },
    { field: "Date_of_filing", filter: true, headerName: "Date of Filing" },
    { field: "Nationality", filter: true, headerName: "Nationality" },
    { field: "Status_of_patent", filter: true, headerName: "Patent Status" },
    { field: "Type", filter: true, headerName: "Type" },
    { field: "Feild_of_use", filter: true, headerName: "Field of Use" },
    { field: "Remarks", filter: true, headerName: "Remarks" },
  ]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "/api/stats/ip_and_commercialization/get_ip_disclosure"
      );
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
    const name =
      selectedRows.length === 1 ? selectedRows[0].Name_of_Government_Body : "";
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
          onRowClicked={onSelectionChanged}
        />
      </div>

      {selectedRow && 
      <Product_to_Industrydata isOpen={isModalOpen} closeModal={closeModal} data={selectedRow} admin={true} />
      }
    </div>
  );
}
