import { toast } from "sonner";

const BASEURL = "http://localhost:3000/api";

interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

class ApiClientError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "ApiClientError";
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
  }
}

interface BaseApiOptions {
  timeout?: number;
  headers?: HeadersInit;
  showErrorToast?: boolean;
}

interface ApiOptionsWithoutBody extends BaseApiOptions {
  params?: Record<string, string | number | boolean>;
}

interface ApiOptionsWithBody<TData = unknown> extends BaseApiOptions {
  data: TData;
  params?: Record<string, string | number | boolean>;
}

async function fetchApi<TResponse>(
  endpoint: string,
  options: RequestInit & { showErrorToast?: boolean },
): Promise<TResponse> {
  const showErrorToast = options.showErrorToast ?? true;

  try {
    const response = await fetch(`${BASEURL}/${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
    });

    let responseData: unknown;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const error: ApiError = {
        message:
          typeof responseData === "object" &&
          responseData !== null &&
          "message" in responseData
            ? String(responseData.message)
            : "API request failed",
        status: response.status,
        code:
          typeof responseData === "object" &&
          responseData !== null &&
          "code" in responseData
            ? String(responseData.code)
            : undefined,
        details: responseData,
      };

      throw new ApiClientError(error);
    }

    return responseData as TResponse;
  } catch (error) {
    if (error instanceof ApiClientError) {
      if (showErrorToast) {
        toast.error(error.message);
      }
      throw error;
    }

    const networkError = new ApiClientError({
      message:
        error instanceof Error ? error.message : "Network request failed",
      status: 0,
    });

    if (showErrorToast) {
      toast.error(networkError.message);
    }
    throw networkError;
  }
}

function buildQueryString(
  params?: Record<string, string | number | boolean>,
): string {
  if (!params || Object.keys(params).length === 0) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return `?${searchParams.toString()}`;
}

export const apiClient = {
  get: <TResponse>(
    endpoint: string,
    options?: ApiOptionsWithoutBody,
  ): Promise<TResponse> => {
    const queryString = buildQueryString(options?.params);
    return fetchApi<TResponse>(`${endpoint}${queryString}`, {
      method: "GET",
      headers: options?.headers,
      signal: AbortSignal.timeout(options?.timeout || 10000),
      showErrorToast: options?.showErrorToast,
    });
  },

  post: <TResponse, TData = unknown>(
    endpoint: string,
    options: ApiOptionsWithBody<TData>,
  ): Promise<TResponse> => {
    const queryString = buildQueryString(options.params);
    return fetchApi<TResponse>(`${endpoint}${queryString}`, {
      method: "POST",
      headers: options.headers,
      body: JSON.stringify(options.data),
      signal: AbortSignal.timeout(options.timeout || 10000),
      showErrorToast: options.showErrorToast,
    });
  },

  put: <TResponse, TData = unknown>(
    endpoint: string,
    options: ApiOptionsWithBody<TData>,
  ): Promise<TResponse> => {
    const queryString = buildQueryString(options.params);
    return fetchApi<TResponse>(`${endpoint}${queryString}`, {
      method: "PUT",
      headers: options.headers,
      body: JSON.stringify(options.data),
      signal: AbortSignal.timeout(options.timeout || 10000),
      showErrorToast: options.showErrorToast,
    });
  },

  patch: <TResponse, TData = unknown>(
    endpoint: string,
    options: ApiOptionsWithBody<TData>,
  ): Promise<TResponse> => {
    const queryString = buildQueryString(options.params);
    return fetchApi<TResponse>(`${endpoint}${queryString}`, {
      method: "PATCH",
      headers: options.headers,
      body: JSON.stringify(options.data),
      signal: AbortSignal.timeout(options.timeout || 10000),
      showErrorToast: options.showErrorToast,
    });
  },

  delete: <TResponse>(
    endpoint: string,
    options?: ApiOptionsWithoutBody,
  ): Promise<TResponse> => {
    const queryString = buildQueryString(options?.params);
    return fetchApi<TResponse>(`${endpoint}${queryString}`, {
      method: "DELETE",
      headers: options?.headers,
      signal: AbortSignal.timeout(options?.timeout || 10000),
      showErrorToast: options?.showErrorToast,
    });
  },
};

export type { ApiError, ApiOptionsWithoutBody, ApiOptionsWithBody };
export { ApiClientError };
