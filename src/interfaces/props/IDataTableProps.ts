export interface IDataTableProps
{
  "columns"?:
  [
    {
      "field": string,
      "headerName": string,
      "width": number,
    }
  ],
  "rows"?: 
  [
    {
      // Empty object here as row data can be different
    }
  ]
}