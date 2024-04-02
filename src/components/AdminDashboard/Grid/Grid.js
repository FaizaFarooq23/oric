import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Create new GridExample component
export default function Grid({ data }) {
  const gridRef = useRef();
  const router = useRouter();
  const [colDefs] = useState([

    { field: 'Name_of_pi', filter: true, headerName: 'Name of PI',},
    { field: 'title', filter: true, headerName: 'Project Title', },
    { field: 'Thematic_Area', filter: true, headerName: 'Thematic Area', },
    { field: 'funding_agency', filter: true, headerName: 'Funding Agency', },
    { field: 'funding_utilized', filter: true, headerName: 'Funding Amount', },
    { field: 'category', filter: true, headerName: 'Project Type',},
    { field: 'start_Date', filter: true, headerName: 'Start Date', valueFormatter: params => params.value.split("T")[0]},
    { field: 'end_Date', filter: true, headerName: 'End Date', valueFormatter: params => params.value?.split("T")[0]},
    { field: 'Status_of_proposal', filter: true, headerName: 'Proposal Status', },
    { field: 'Status_of_project', filter: true, headerName: 'Project Status', },
    { field: 'Department_of_Pi', filter: true, headerName: 'Department', },
    { field: 'Date_of_Submission', filter: true, headerName: 'Date of Submission', valueFormatter: params => params.value?.split("T")[0]},
    { field: 'funding_approved', filter: true, headerName: 'Funding Approved', },
    { field: 'funding_utilized', filter: true, headerName: 'Funding Utilized', },
    { field: 'funding_remaining', filter: true, headerName: 'Funding Remaining', },

    // {
    //   headerName: 'SIM 1',
    //   groupId: 'group1',
    //   children: [
    //     { field: 'expenditure1Monthly', headerName: 'Expenditure $' },
    //     { field: 'usage1', headerName: 'Usage %', },
    //     { field: 'limit1', headerName: 'Limit GBs', },
    //   ]
    // },
    // {
    //   headerName: 'SIM 2',
    //   groupId: 'group1',
    //   children: [
    //     { field: 'expenditure2Monthly', headerName: 'Expenditure $' },
    //     { field: 'usage2', headerName: 'Usage %', filter: true, },
    //     { field: 'limit2', headerName: 'Limit GBs', valueParser: params => Number(params.newValue) / 1024 }
    //   ]
    // },
  ]);


  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const result = selectedRows.length === 1 ? selectedRows[0].id : '';
    const name = selectedRows.length === 1 ? selectedRows[0].name : '';
   // router.push(`/device/${result}/${name}`);

  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={
        "ag-theme-quartz"
      }
      style={{ width: '100%', height: '600px' }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={colDefs}
        rowSelection={'single'}
        suppressHorizontalScroll={true}
        onSelectionChanged={onSelectionChanged} />
    </div>
  );
};