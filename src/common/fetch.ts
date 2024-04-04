export interface LoginResponse {
  data: any
  message: string
  error: unknown
}

interface ResponseData<T> {
  data: T
  message?: string
  error: unknown
}

interface ErrorResponse {
  message?: string
  error: string
  data: unknown
}

type Callback<T> = (response: ResponseData<T> | ErrorResponse | LoginResponse) => void

export function fetchData<T>(endpoint: string, data: unknown, callback: Callback<T>): any {
  const options = {
    method: data !== null ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data !== null ? JSON.stringify(data) : null,
  }

  fetch(endpoint, options)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return await (response.json() as Promise<T>)
    })
    .then((responseData) => {
      const message = (responseData as any).message
      const result: ResponseData<T> = {
        data: responseData,
        message,
        error: undefined,
      }
      callback(result)
    })
    .catch((error) => {
      if (error.response !== null) {
        throw new Error(error.response.data.message)
      }
      console.error(error)
    })
}
