'use client';

import cn from 'classnames';
import { ProjectsProps } from './Projects.props';
import styles from './Projects.module.css';
import ProjectList from '@/components/ProjectList/ProjectList';

export const Projects = ({ className, ...props }: ProjectsProps): JSX.Element => {
	return (
		<div className={cn(className, styles.projects)} {...props}>
			<ProjectList />
		</div>
	);
};