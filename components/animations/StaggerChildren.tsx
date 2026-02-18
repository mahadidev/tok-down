import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface StaggerChildrenProps extends React.HTMLAttributes<HTMLDivElement> {
	staggerDelay?: number;
	childDelay?: number;
	variants?: Variants;
}

const defaultContainerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const defaultItemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

const StaggerChildren = React.forwardRef<HTMLDivElement, StaggerChildrenProps>(
	(
		{
			className,
			children,
			staggerDelay = 0.1,
			childDelay = 0.2,
			variants,
			...props
		},
		ref
	) => {
		const containerVariants = variants?.container || defaultContainerVariants;
		const itemVariants = variants?.item || defaultItemVariants;

		// Modify container variants with custom delays
		const customContainerVariants: Variants = {
			hidden: (containerVariants as any)?.hidden || { opacity: 0 },
			visible: {
				...(containerVariants as any)?.visible || {},
				transition: {
					staggerChildren: staggerDelay,
					delayChildren: childDelay,
				},
			},
		};

		return (
			<motion.div
				ref={ref}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-10% 0px' }}
				variants={customContainerVariants}
				className={cn(className)}
				{...props}
			>
				{React.Children.toArray(children).map((child, index) => {
					if (React.isValidElement(child)) {
						return (
							<motion.div key={index} variants={itemVariants}>
								{child}
							</motion.div>
						);
					}
					return child;
				})}
			</motion.div>
		);
	}
);

StaggerChildren.displayName = 'StaggerChildren';

export default StaggerChildren;
