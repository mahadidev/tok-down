/**
 * Typed Redux Hooks
 * Use these hooks throughout the app instead of raw useDispatch/useSelector
 */

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Use throughout the app instead of plain `useDispatch`
 */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

/**
 * Use throughout the app instead of plain `useSelector`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
