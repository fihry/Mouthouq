/**
 * Centralized API Client for Mouthouq
 * Handles authentication headers, error parsing, and base URL configuration.
 */

const BASE_URL = "/api/v1";

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: RequestOptions = {}) {
    const { params, headers, ...customConfig } = options;

    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Construct URL with query parameters
    let url = `${BASE_URL}${endpoint}`;
    if (params) {
        const searchParams = new URLSearchParams(params);
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
            return null;
        }

        const data = await response.json();

        if (response.ok) {
            return data;
        }

        // Standardize error handling
        const errorMsg = data?.error || data?.message || "Something went wrong";
        throw new Error(errorMsg);
    } catch (error: any) {
        console.error(`API Error [${options.method || "GET"}] ${endpoint}:`, error);
        throw error;
    }
}

// Convenience methods
apiClient.get = (endpoint: string, options?: RequestOptions) => apiClient(endpoint, { ...options, method: "GET" });
apiClient.post = (endpoint: string, body: any, options?: RequestOptions) =>
    apiClient(endpoint, { ...options, method: "POST", body: JSON.stringify(body) });
apiClient.put = (endpoint: string, body: any, options?: RequestOptions) =>
    apiClient(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) });
apiClient.delete = (endpoint: string, options?: RequestOptions) => apiClient(endpoint, { ...options, method: "DELETE" });
