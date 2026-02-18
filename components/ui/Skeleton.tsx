import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					'animate-pulse bg-dark-600 rounded-md',
					className
				)}
				{...props}
			/>
		);
	}
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
