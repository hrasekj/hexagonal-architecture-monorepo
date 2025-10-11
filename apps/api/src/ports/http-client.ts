export interface IHttpClient {
  get<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  post<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  put<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  patch<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>>
  delete<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>>
}

interface HttpRequestOptions {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  timeoutMs?: number
}

interface HttpResponse<T> {
  status: number
  data: T
  headers: Record<string, string>
}
