/**
 * Centralized API Client for Mouthouq
 * Handles authentication headers, error parsing, and base URL configuration.
 */

const BASE_URL = "/api/v1";

interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean>;
}

interface ApiErrorResponse {
    error?: string;
    message?: string;
}

type ApiClient = {
    <TResponse = unknown>(endpoint: string, options?: RequestOptions): Promise<TResponse>;
    get<TResponse = unknown>(endpoint: string, options?: RequestOptions): Promise<TResponse>;
    post<TResponse = unknown, TBody = unknown>(endpoint: string, body: TBody, options?: RequestOptions): Promise<TResponse>;
    put<TResponse = unknown, TBody = unknown>(endpoint: string, body: TBody, options?: RequestOptions): Promise<TResponse>;
    delete<TResponse = unknown>(endpoint: string, options?: RequestOptions): Promise<TResponse>;
}

export const apiClient: ApiClient = async <TResponse = unknown>(
    endpoint: string,
    options: RequestOptions = {}
) => {
    const { params, headers, ...customConfig } = options;
    const isFormDataBody = typeof FormData !== "undefined" && customConfig.body instanceof FormData;

    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const defaultHeaders: HeadersInit = {};
    if (!isFormDataBody) {
        defaultHeaders["Content-Type"] = "application/json";
    }

    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Construct URL with query parameters
    let url = `${BASE_URL}${endpoint}`;
    if (params) {
        const searchParams = new URLSearchParams(
            Object.entries(params).map(([key, value]) => [key, String(value)])
        );
        url += `?${searchParams.toString()}`;
    }

    const config: RequestInit = {
        method: options.method || "GET",
        headers: {
            ...defaultHeaders,
            ...headers,
        },
        ...customConfig,
    };

    try {
        const response = await fetch(url, config);

        // Handle 204 No Content
        if (response.status === 204) {
            return null as TResponse;
        }

        const contentType = response.headers.get("content-type") || "";
        const isJsonResponse = contentType.includes("application/json");
        const data = isJsonResponse ? await response.json() as unknown : await response.text();

        if (response.ok) {
            return data as TResponse;
        }

        // Standardize error handling
        const errorData = isJsonResponse ? (data as ApiErrorResponse) : null;
        const errorMsg = errorData?.error || errorData?.message || response.statusText || "Something went wrong";
        throw new Error(errorMsg);
    } catch (error: unknown) {
        console.error(`API Error [${options.method || "GET"}] ${endpoint}:`, error);
        throw error;
    }
}

// Convenience methods
apiClient.get = <TResponse = unknown>(endpoint: string, options?: RequestOptions) =>
    apiClient<TResponse>(endpoint, { ...options, method: "GET" });
apiClient.post = <TResponse = unknown, TBody = unknown>(endpoint: string, body: TBody, options?: RequestOptions) =>
    apiClient<TResponse>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) });
apiClient.put = <TResponse = unknown, TBody = unknown>(endpoint: string, body: TBody, options?: RequestOptions) =>
    apiClient<TResponse>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) });
apiClient.delete = <TResponse = unknown>(endpoint: string, options?: RequestOptions) =>
    apiClient<TResponse>(endpoint, { ...options, method: "DELETE" });
