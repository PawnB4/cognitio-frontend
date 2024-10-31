const baseURL = import.meta.env.VITE_BACKEND_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions<TBody = unknown> {
  method: HttpMethod;
  body?: TBody;
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
  { method, body }: RequestOptions<TBody>
): Promise<TResponse> {
  const endpoint = `${baseURL}${url}/`
  console.log("ABSTRACTION ENDPOINT: ", endpoint)
  console.log("ABSTRACTION BODY: ", body)
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log("Response from abstraction: ", response)

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
  get: <TResponse>(url: string) =>
    request<TResponse>(url, { method: "GET" }),

  post: <TResponse, TBody>(url: string, body: TBody) =>
    request<TResponse, TBody>(url, { method: "POST", body }),

  put: <TResponse, TBody>(url: string, body: TBody) =>
    request<TResponse, TBody>(url, { method: "PUT", body }),

  delete: <TResponse>(url: string) =>
    request<TResponse>(url, { method: "DELETE" }),
};