/**
 * Error Boundary Component
 * React error boundary for catching and displaying errors
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default fallback UI
			return (
				<div className="min-h-[400px] flex items-center justify-center p-4">
					<div className="max-w-md w-full bg-dark-800 border border-dark-700 rounded-2xl p-8 text-center">
						<div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<FiAlertTriangle className="w-8 h-8 text-red-500" />
						</div>
						<h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
						<p className="text-gray-400 mb-6">
							{this.state.error?.message || 'An unexpected error occurred'}
						</p>
						<button
							onClick={this.handleReset}
							className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-xl transition-all"
						>
							<FiRefreshCw className="w-4 h-4" />
							Try Again
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
