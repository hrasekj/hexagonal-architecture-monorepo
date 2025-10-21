import type {
  HttpHeaders,
  HttpRequest,
  HttpRequestOptions,
  HttpResponse,
  IHttpClient,
} from '../../application/clients/http-client.js'

export class FetchHttpClient implements IHttpClient {
  async get<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    const response = await fetch(url, options)

    return this.mapResponse(response)
  }

  async post<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      ...options,
    })

    return this.mapResponse(response)
  }

  async put<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      ...options,
    })

    return this.mapResponse(response)
  }

  async patch<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      ...options,
    })

    return this.mapResponse(response)
  }

  async delete<T>(url: string, options?: HttpRequestOptions): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method: 'DELETE',
      ...options,
    })

    return this.mapResponse(response)
  }

  async request<T>(request: HttpRequest): Promise<HttpResponse<T>> {
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })

    return this.mapResponse(response)
  }

  private async mapResponse<T>(response: Response): Promise<HttpResponse<T>> {
    const data = (await response.json()) as T

    const headers: HttpHeaders = {}

    for (const [key, value] of response.headers.entries()) {
      headers[key.toLowerCase()] = value
    }

    return { status: response.status, data, headers }
  }
}
