/**
 * useClipboard Hook
 * Handles clipboard functionality extracted from Video component
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseClipboardReturn {
	copied: boolean;
	copy: (text: string) => Promise<void>;
	isSupported: boolean;
}

/**
 * Hook for copying text to clipboard with feedback state
 */
export const useClipboard = (resetDelay: number = 2000): UseClipboardReturn => {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [isSupported, setIsSupported] = useState(false);

	// Check if clipboard API is supported
	useEffect(() => {
		setIsSupported(
			typeof navigator !== 'undefined' && 'clipboard' in navigator && 'writeText' in navigator.clipboard
		);
	}, []);

	/**
	 * Copy text to clipboard
	 */
	const copy = useCallback(async (text: string) => {
		if (!isSupported) {
			console.warn('Clipboard API is not supported in this environment');
			return;
		}

		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);

			// Clear existing timeout
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// Reset copied state after delay
			timeoutRef.current = setTimeout(() => {
				setCopied(false);
			}, resetDelay);
		} catch (error) {
			console.error('Failed to copy text:', error);
			setCopied(false);
		}
	}, [isSupported, resetDelay]);

	/**
	 * Cleanup timeout on unmount
	 */
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return {
		copied,
		copy,
		isSupported,
	};
};

/**
 * Hook for clipboard with tooltip state
 */
export const useClipboardWithTooltip = (resetDelay: number = 2000) => {
	const { copied, copy, isSupported } = useClipboard(resetDelay);
	const [showTooltip, setShowTooltip] = useState(false);

	const copyWithTooltip = useCallback(async (text: string) => {
		await copy(text);
		setShowTooltip(true);

		setTimeout(() => {
			setShowTooltip(false);
		}, resetDelay);
	}, [copy, resetDelay]);

	return {
		copied,
		copy: copyWithTooltip,
		showTooltip,
		isSupported,
	};
};
