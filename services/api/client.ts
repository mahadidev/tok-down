/**
 * API Client
 * Axios instance with interceptors and error handling
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, DEFAULT_HEADERS, API_ERRORS } from '@/constants/api';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
	public readonly statusCode: number | undefined;
	public readonly response?: unknown;
	public code?: string;

	constructor(message: string, statusCode?: number, response?: unknown) {
		super(message);
		this.name = 'ApiError';
		this.statusCode = statusCode;
		this.response = response;

		// Maintains proper stack trace for where our error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
	}

	/**
	 * Check if error is a network error
	 */
	isNetworkError(): boolean {
		return this.statusCode === undefined;
	}

	/**
	 * Check if error is a timeout
	 */
	isTimeout(): boolean {
		return this.code === 'ECONNABORTED' || this.message.includes('timeout');
	}

	/**
	 * Get user-friendly error message
	 */
	getUserMessage(): string {
		if (this.isTimeout()) {
			return API_ERRORS.REQUEST_TIMEOUT;
		}
		if (this.isNetworkError()) {
			return API_ERRORS.NETWORK_ERROR;
		}
		return this.message || API_ERRORS.UNKNOWN_ERROR;
	}
}

/**
 * Create configured axios instance
 */
export const createApiClient = (): AxiosInstance => {
	const client = axios.create({
		baseURL: API_CONFIG.BASE_URL,
		timeout: API_CONFIG.TIMEOUT,
		headers: {
			...DEFAULT_HEADERS,
			'X-RapidAPI-Key': API_CONFIG.KEY,
			'X-RapidAPI-Host': API_CONFIG.HOST,
		},
	});

	/**
	 * Request interceptor
	 */
	client.interceptors.request.use(
		(config) => {
			// Add timestamp for debugging
			config.metadata = { startTime: Date.now() };
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	/**
	 * Response interceptor
	 */
	client.interceptors.response.use(
		(response: AxiosResponse) => {
			// Calculate request duration
			const duration = Date.now() - (response.config.metadata?.startTime || 0);
			response.config.metadata = { ...response.config.metadata, duration };
			return response;
		},
		(error: AxiosError<unknown>) => {
			// Transform error to ApiError
			const apiError = new ApiError(
				error.message || API_ERRORS.UNKNOWN_ERROR,
				error.response?.status,
				error.response?.data
			);

			// Add code for timeout detection
			if (error.code === 'ECONNABORTED') {
				apiError.code = error.code;
			}

			return Promise.reject(apiError);
		}
	);

	return client;
};

/**
 * Export singleton instance
 */
export const apiClient = createApiClient();

/**
 * Extend AxiosRequestConfig to include metadata
 */
declare module 'axios' {
	export interface AxiosRequestConfig {
		metadata?: {
			startTime?: number;
			duration?: number;
		};
	}
}

/**
 * Helper function to make API requests with error handling
 */
export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
	try {
		const response = await apiClient.request<T>(config);
		return response.data;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(API_ERRORS.UNKNOWN_ERROR);
	}
};
