import { SheetResponse } from 'types';
import { ColumnType } from '../constants';

export const newHeader = { name: '', type: ColumnType.TEXT, new: true }

export const sheet = {
  headers: {
    name: { name: 'Name', type: ColumnType.TEXT },
    description: { name: 'Description', type: ColumnType.TEXT },
    price: { name: 'Price', type: ColumnType.NUMBER },
    new: newHeader,
  },
  data: [
    { name: 'Kamran', description: 'wqqwed', price: 1 },
    { name: 'Ali', description: 'qwe', price: 1 },
    { name: 'Khurram', description: 'asdsad', price: 1 },
    { name: 'asad', description: 'scdcs', price: 1 },
    { name: 'Dan', description: 'erferer', price: 1 },
    { name: 'Yelo', description: 'asdc', price: 1 },
    { name: 'Done', description: 'qewdwed', price: 1 },
  ],
}

export const createSheetResponse: SheetResponse = {
  id: 1,
  name: 'sheet 1',
  columns: [],
  rows: {},
}
