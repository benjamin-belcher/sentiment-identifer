import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface DataTableProps{
  "columns":
  [
    {
      "field": string,
      "headerName": string,
      "width": number,
    }
  ],
  "rows": 
  [
    {
      // Empty object here as row data can be different
    }
  ]
}

export default function DataTable(props:DataTableProps){
    return(
        <DataGrid
            rows={props.rows}
            columns={props.columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
      />
    )
}