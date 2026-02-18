import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface SlideUpProps extends HTMLMotionProps<'div'> {
	delay?: number;
	duration?: number;
	staggerChildren?: number;
}

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

const SlideUp = React.forwardRef<HTMLDivElement, SlideUpProps>(
	(
		{
			className,
			children,
			delay = 0,
			duration = 0.5,
			staggerChildren = 0.1,
			...props
		},
		ref
	) => {
		return (
			<motion.div
				ref={ref}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-10% 0px' }}
				variants={{
					hidden: { opacity: 0, y: 60 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							duration,
							delay,
							ease: [0.25, 0.1, 0.25, 1],
						},
					},
				}}
				className={cn(className)}
				{...props}
			>
				{children}
			</motion.div>
		);
	}
);

SlideUp.displayName = 'SlideUp';

export default SlideUp;

export { containerVariants, itemVariants };
