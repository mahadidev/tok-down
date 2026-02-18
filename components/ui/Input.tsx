import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, error, icon, type = 'text', ...props }, ref) => {
		return (
			<div className="relative w-full">
				{icon && (
					<div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
						{icon}
					</div>
				)}
				<input
					type={type}
					className={cn(
						'w-full h-14 px-4 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder:text-muted-foreground',
						'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
						'transition-all duration-200',
						icon && 'pl-12',
						error && 'border-red-500 focus:ring-red-500',
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
