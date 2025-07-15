export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type APIObjectType = {
  url: string
  method: MethodType
  responseType?: string
  headers?: Record<string, string>
  showResponse?: boolean
  handleErrorManually?: boolean
}

export const API_BASIC_URL = {
  SECURED_API: '/secure',
  UNSECURED_API: '/unsecured',
} as const

export type PathBaseKeys = keyof typeof API_BASIC_URL

export type ApiActionProps = {
  path: string
  method: MethodType
  pathBase?: PathBaseKeys
  baseUrl?: string
  responseType?: string
  showResponse?: boolean
  handleErrorManually?: boolean
}

export const createApiAction = ({
  path,
  method,
  pathBase = 'SECURED_API',
  baseUrl = `${process.env.BACKEND_URL}_api/v1`,
  responseType,
  showResponse = true,
  handleErrorManually = true,
}: ApiActionProps): APIObjectType => {
  const base = API_BASIC_URL[pathBase]
  const url = `${baseUrl}${base}${path}`.replace(/([^:]\/)\/+/g, '$1')
  return {
    url,
    method,
    responseType,
    showResponse,
    handleErrorManually,
  }
}
