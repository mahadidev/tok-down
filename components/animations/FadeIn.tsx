import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface FadeInProps extends HTMLMotionProps<'div'> {
	delay?: number;
	duration?: number;
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
	(
		{
			className,
			children,
			delay = 0,
			duration = 0.5,
			direction = 'up',
			...props
		},
		ref
	) => {
		const variants = {
			hidden: {
				opacity: 0,
				x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
				y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
			},
			visible: {
				opacity: 1,
				x: 0,
				y: 0,
			},
		};

		return (
			<motion.div
				ref={ref}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-10% 0px' }}
				variants={variants}
				transition={{ duration, delay, ease: 'easeOut' }}
				className={cn(className)}
				{...props}
			>
				{children}
			</motion.div>
		);
	}
);

FadeIn.displayName = 'FadeIn';

export default FadeIn;
