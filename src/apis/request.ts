import { ErrorResponse } from 'types'

export const baseUrl = process.env.REACT_APP_BASE_API_URL

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

export default async function request<T>(endpoint: string, options?: RequestInit): Promise<T | ErrorResponse> {
  try {
    const { headers, ...restOpts } = options || {}

    const res = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      ...restOpts,
    })

    if (!res.ok) return { error: true, msg: res.statusText }

    const jsonRes: T = await res.json()
    return jsonRes
  } catch(err) {
    return { error: true, msg: getErrorMessage(err) }
  }
}
