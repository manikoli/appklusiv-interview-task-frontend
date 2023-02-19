// interface Response {
//   data: unknown
//   message: string
// }

export interface LoginResponse {
  data: any
  message: string
  error: unknown
}

// const URL = process.env.REACT_APP_API_URL ?? ''

// export async function fetchData(
//   endpoint: string,
//   data: RegisterFormData | LoginFormData | unknown = {},
// ): Promise<any> {
//   console.log(JSON.stringify(data), 'FETCH')
//   fetch(`${URL}/${endpoint}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then(async (response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok')
//       }
//       return await response.json()
//     })
//     .then((data) => {
//       console.log(data)
//     })
//     .catch((error) => {
//       console.error(error)
//       const errorMessage = error.message ?? 'Unknown error'
//       // Display the error message to the user
//     })
// }

// interface Response<T> {
//   data?: T | null
//   message: string
// }

// async function fetchData<T>(endpoint: string, data?: any): Promise<Response<T>> {
//   const options: RequestInit = {
//     method: data ? 'POST' : 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: data ? JSON.stringify(data) : null,
//   }

//   const response = await fetch(endpoint, options)

//   if (!response.ok) {
//     throw new Error('Network response was not ok')
//   }

//   const responseData: T = await response.json()

//   return { data: responseData, message: responseData !== undefined ? responseData.message : '' }
// }

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
