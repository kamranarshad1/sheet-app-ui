import { useCallback, useEffect, useState } from 'react'
import { newHeader } from '../../fixtures'
import AddColumn from '../../components/AddColumn';
import { ColumnType } from '../../constants';
import request from '../../apis/request';
import { useParams } from 'react-router';
import Cell from '../../components/Cell';
import { ColumnResponse, ErrorResponse, RowsResponse, SheetResponse } from 'types';

export default function Sheet() {
  const [sheet, setSheet] = useState<{ headers: (ColumnResponse | typeof newHeader)[], rows: RowsResponse }>({ headers: [], rows: {} })
  const { sheetId } = useParams<{ sheetId: string }>()

  useEffect(() => {
    request<SheetResponse>(`/sheets/${sheetId}`).then((res: SheetResponse | ErrorResponse) => {
      if ('error' in res) {
        console.log(res)
        return
      }

      setSheet({ headers: [...res.columns, newHeader], rows: res.rows })
    })
  }, [sheetId])

  const handleAddNewColumn = useCallback(async (column: { value: string, type: string }) => {
    const res: ColumnResponse | ErrorResponse = await request<ColumnResponse>(`/sheets/${sheetId}/columns`, {
      method: 'POST',
      body: JSON.stringify({ name: column.value, type: column.type })
    })

    if ('error' in res) {
      console.log(res)
      return
    }

    const copiedHeaders = [...sheet.headers]
    copiedHeaders[copiedHeaders.length-1] = res
    copiedHeaders.push(newHeader)

    setSheet({...sheet, headers: copiedHeaders })
  }, [sheet, setSheet, sheetId])

  const renderCells = (rowIndex: number) => {
    return sheet.headers.map((header) => {
      let cell

      if (sheet.rows?.[rowIndex] !== undefined) {
        cell = sheet.rows[rowIndex].find((row) => 'id' in header && row.columnId === header.id)
      }

      if ('new' in header) return null

      return (
        <Cell
          id={cell?.id}
          value={cell?.value ?? ''}
          type={header.type}
          key={header.id + rowIndex}
          columnId={header.id}
          index={rowIndex}
        />
      )
    })
  }

  return (
    <table>
      <thead style={{background: '#ccc'}}>
        <tr>
          {
            sheet.headers.map((header, index) => (
              'new' in header
                ? <AddColumn key={index} onAddNewColumn={handleAddNewColumn} />
                : <th key={header.name + header.id}>
                    {header.name}
                    <small style={{color: 'rgb(109 115 115)'}}> {header.type === ColumnType.TEXT ? 'Aa' : '#'}</small>
                  </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          [...Array(100)].map((_, index) => (
            <tr key={index}>
              {
                renderCells(index)
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
