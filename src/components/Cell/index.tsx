import { useState, useCallback, memo, ChangeEvent, KeyboardEvent } from 'react'
import { ColumnType } from 'constants/index'
import { useParams } from 'react-router'
import request from '../../apis/request'
import { CellResponse, ErrorResponse } from 'types'

interface ComponentProps {
  id?: number
  value: string
  type: ColumnType
  columnId: number
  index: number
}

interface SavedCellState {
  id?: number
  value: string
}

export default memo(function Cell({id, value='', type, columnId, index}: ComponentProps) {
  const [savedCell, setSavedCell] = useState<SavedCellState>({
    id,
    value,
  })
  const [text, setText] = useState<string>(value)
  const { sheetId } = useParams<{ sheetId: string }>()

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  const handleBlur = useCallback(() => {
    let method = 'POST'
    let endpoint = `/sheets/${sheetId}/columns/${columnId}/cells`

    if (savedCell.id) {
      endpoint += `/${savedCell.id}`
      method = 'PUT'
    }

    request<CellResponse>(endpoint, {
      method,
      body: JSON.stringify({
        value: text,
        row: index,
      })
    }).then((res: CellResponse | ErrorResponse) => {
      console.log(res)

      if ('error' in res) {
        setText(savedCell.value)
        return
      }

      setSavedCell({ ...savedCell, id: res.id, value: res.value })
    })
  }, [text, columnId, index, savedCell, sheetId])

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') handleBlur()
  }

  return (
    <td>
      <input type={type} value={text} onChange={handleChange} onKeyUp={handleKeyUp} />
    </td>
  )
})
