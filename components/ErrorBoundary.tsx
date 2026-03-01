'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): State {
		// Update state so the next render will show the fallback UI
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Log the error to an error reporting service
		console.error('[Error Boundary] Caught error:', error, errorInfo);

		// Update state with error info
		this.setState({
			error,
			errorInfo,
		});

		// TODO: Send to error reporting service (Sentry, LogRocket, etc.)
		// logErrorToService(error, errorInfo);
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
		// Reload the page to reset the application state
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default error UI
			return (
				<div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
					<div className="max-w-md w-full bg-dark-800 rounded-2xl p-8 border border-dark-700 shadow-xl">
						<div className="flex flex-col items-center text-center">
							{/* Error Icon */}
							<div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
								<FiAlertCircle className="w-8 h-8 text-red-500" />
							</div>

							{/* Error Title */}
							<h1 className="text-2xl font-bold text-white mb-3">
								Something Went Wrong
							</h1>

							{/* Error Message */}
							<p className="text-gray-400 mb-6">
								{process.env.NODE_ENV === 'development'
									? this.state.error?.message || 'An unexpected error occurred'
									: 'An unexpected error occurred. Please try again.'}
							</p>

							{/* Development Details */}
							{process.env.NODE_ENV === 'development' && this.state.errorInfo && (
								<details className="w-full mb-6 text-left">
									<summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-400 mb-2">
										Error Details
									</summary>
									<pre className="text-xs text-red-400 bg-dark-900 p-3 rounded-lg overflow-auto max-h-40">
										{this.state.error?.stack}
									</pre>
								</details>
							)}

							{/* Reset Button */}
							<button
								onClick={this.handleReset}
								className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
							>
								<FiRefreshCw className="w-4 h-4" />
								Try Again
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

/**
 * HOC to wrap components with Error Boundary
 */
export function withErrorBoundary<P extends object>(
	Component: React.ComponentType<P>,
	fallback?: ReactNode
) {
	return function WrappedComponent(props: P) {
		return (
			<ErrorBoundary fallback={fallback}>
				<Component {...props} />
			</ErrorBoundary>
		);
	};
}

/**
 * Hook to trigger errors from within components
 * Useful for testing error boundaries
 */
export function useErrorHandler() {
	return (error: Error) => {
		throw error;
	};
}
