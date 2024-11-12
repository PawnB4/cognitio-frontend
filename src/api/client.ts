const baseURL = import.meta.env.VITE_BACKEND_URL;
interface RequestHeader {
  key: string;
  value: string;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions<TBody = unknown> {
  method: HttpMethod;
  body?: TBody;
  headers?: RequestHeader[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<TResponse, TBody = unknown>(
  url: string,
  { method, body, headers = [] }: RequestOptions<TBody>
): Promise<TResponse> {
  const normalizedUrl = url.endsWith('/') ? url : `${url}/`;

  // Combine default headers with custom headers
  const requestHeaders = new Headers({
    "Content-Type": "application/json",
  });

  // Add custom headers
  headers.forEach(header => {
    requestHeaders.set(header.key, header.value);
  });

  const response = await fetch(`${baseURL}${normalizedUrl}`, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(
      await response.text(),
      response.status,
      response.statusText
    );
  }

  return response.json() as Promise<TResponse>;
}

export const client = {
  get: <TResponse>(url: string, headers?: RequestHeader[]) =>
    request<TResponse>(url, { method: "GET", headers }),
  post: <TResponse, TBody>(url: string, body: TBody, headers?: RequestHeader[]) =>
    request<TResponse, TBody>(url, { method: "POST", body, headers }),
  put: <TResponse, TBody>(url: string, body: TBody, headers?: RequestHeader[]) =>
    request<TResponse, TBody>(url, { method: "PUT", body, headers }),
  delete: <TResponse>(url: string, headers?: RequestHeader[]) =>
    request<TResponse>(url, { method: "DELETE", headers }),
};