import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, hover = true, children, ...props }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={cn(
					'bg-dark-700 rounded-2xl border border-dark-600 overflow-hidden',
					hover && 'hover:border-dark-500 hover:shadow-xl hover:shadow-orange-500/10',
					'transition-all duration-300',
					className
				)}
				whileHover={hover ? { y: -4 } : undefined}
				{...props}
			>
				{children}
			</motion.div>
		);
	}
);

Card.displayName = 'Card';

export default Card;
