export interface IHttpClient {
  get<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  post<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  put<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  patch<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  delete<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  request<T>(request: HttpRequest): Promise<HttpResponse<T>>
}

export interface HttpRequestOptions {
  headers?: HttpHeaders
  params?: Record<string, string | number | boolean>
  timeoutMs?: number
}

export interface HttpRequest extends HttpRequestOptions {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: RequestInit['body']
}

export interface HttpResponse<T> {
  status: number
  data: T
  headers: HttpHeaders
}

export type HttpHeaders = Record<string, string>
