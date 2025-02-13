import { SelectProps } from './Select.props';
import styles from './Select.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Select = forwardRef(({ className, error, options, ...props }: SelectProps, ref: ForwardedRef<HTMLSelectElement>): JSX.Element => {
	return (
		<div className={cn(className, styles.selectWrapper)}>
			<select className={cn(styles.select, {
				[styles.error]: error
			})} ref={ref} {...props}>
				{options.map((option: { id: number; title: string }) => (
					<option key={option.id} value={option.id}>
						{option.title}
					</option>
				))}
			</select>
			{error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});

Select.displayName = 'Select';
