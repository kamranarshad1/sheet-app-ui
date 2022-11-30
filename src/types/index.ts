import { ColumnType } from 'constants/index';

export interface ColumnResponse {
  id: number
  name: string
  sheetId: number
  type: ColumnType
}

export interface CellResponse {
  id: number
  row: number
  columnId: number
  value: string
}

export interface RowsResponse {
  [key: number]: CellResponse[]
}

export interface SheetResponse {
  id: number
  name: string
  columns: ColumnResponse[]
  rows: RowsResponse
}

export interface ErrorResponse {
  error: boolean
  msg: string
}
