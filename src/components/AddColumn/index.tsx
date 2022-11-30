import { ChangeEvent, useState } from 'react'
import { ColumnType } from '../../constants'

interface Props {
  onAddNewColumn: (column: {
    value: string
    type: ColumnType;
  }) => void
}

export default function AddColumn({onAddNewColumn}: Props) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const [type, setType] = useState(ColumnType.TEXT)

  const resetStates = () => {
    setEditing(false)
    setValue('')
    setType(ColumnType.TEXT)
  }

  const handleClick = () => {
    if (editing) return

    setEditing(true)
  }

  const handleSave = () => {
    onAddNewColumn({ value, type })
    resetStates()
  }

  const handleColumnTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as ColumnType)
  }

  return (
    <th onClick={handleClick}>
      {
        !editing
          ? value || '+ Add Column'
          : <>
              <input
                type='text'
                value={value}
                onChange={e => setValue(e.target.value.trim())}
              />
              <select value={type} onChange={handleColumnTypeChange}>
                {
                  (Object.keys(ColumnType) as (keyof typeof ColumnType)[]).map((columnKey) => (
                    <option key={columnKey} value={ColumnType[columnKey]}>{columnKey}</option>
                  ))
                }
              </select>
              <button onClick={handleSave}>Save</button>
              <button onClick={resetStates}>Cancel</button>
            </>
      }
    </th>
  )
}
