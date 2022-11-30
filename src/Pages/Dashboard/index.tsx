import { useEffect, useState } from 'react'
import request from '../../apis/request'
import { useNavigate } from 'react-router'
import { ErrorResponse, SheetResponse } from 'types'

let loading = false

export default function Dashboard() {
  const [sheetId, setSheetId] = useState<number | null>(null)
  const navigate = useNavigate()

  const setAynscState = async () => {
    console.log('before wait');
    await new Promise(r => setTimeout(r, 2000))
    console.log('after wait');

    setSheetId(1000)
  }

  useEffect(() => {
    if (loading || sheetId) return

    loading = true
    request<SheetResponse>('/sheets', { method: 'POST' }).then((res: SheetResponse | ErrorResponse) => {
      if ('error' in res) {
        console.log(res)
        return
      }

      setSheetId((prevState) => {
        console.log({prevState})
        return res.id
      })
    })
    loading = true
    setAynscState()
  }, [sheetId, setSheetId])

  useEffect(() => {
    if (sheetId) navigate(`/${sheetId}`)
  }, [sheetId, navigate])

  return sheetId ? null : <div>Loading</div>;
}
