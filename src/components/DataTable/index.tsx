import React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import {IDataTableProps} from '../../interfaces/IDataTableProps';
import {Box} from '@mui/material';

export default function DataTable(props:IDataTableProps){
    return(
      <Box sx={{height:"60%"}}>
        <DataGrid
            rows={props.rows|| [{}]}
            columns={props.columns|| [{"field": "","headerName": "","width": 0}]}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            components={{
              Toolbar: GridToolbar,
            }}
      />
      </Box>
        
    )
}