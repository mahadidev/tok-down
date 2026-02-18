import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = 'primary',
			size = 'md',
			isLoading = false,
			disabled,
			children,
			...props
		},
		ref
	) => {
		const baseStyles =
			'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed';

		const variants = {
			primary:
				'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25',
			secondary:
				'bg-dark-700 text-white hover:bg-dark-600 border border-dark-600',
			ghost: 'bg-transparent text-white hover:bg-white/5',
			outline:
				'border border-dark-600 text-white hover:bg-dark-700 hover:border-dark-500',
		};

		const sizes = {
			sm: 'px-3 py-1.5 text-sm',
			md: 'px-4 py-2 text-base',
			lg: 'px-6 py-3 text-lg',
		};

		return (
			<motion.button
				ref={ref}
				className={cn(baseStyles, variants[variant], sizes[size], className)}
				disabled={disabled || isLoading}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				{...props}
			>
				{isLoading && (
					<svg
						className="animate-spin h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{children}
			</motion.button>
		);
	}
);

Button.displayName = 'Button';

export default Button;
