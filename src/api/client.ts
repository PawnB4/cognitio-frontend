/* eslint-disable @typescript-eslint/no-explicit-any */
const baseURL = import.meta.env.VITE_BACKEND_URL;

type RequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
};

type FetchResponse<T> = T;

// Generic function to handle all request types
async function request<T>(url: string, { method, body }: RequestOptions): Promise<FetchResponse<T>> {
  const response = await fetch(`${baseURL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "An error occurred");
  }

  return response.json() as Promise<FetchResponse<T>>;
}

// Creating specific request methods for easier usage
export const client = {
  get: <T>(url: string) => request<T>(url, { method: "GET" }),
  post: <T>(url: string, body: Record<string, any>) => request<T>(url, { method: "POST", body }),
  put: <T>(url: string, body: Record<string, any>) => request<T>(url, { method: "PUT", body }),
  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};

