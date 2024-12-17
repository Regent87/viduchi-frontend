'use client';

import cn from 'classnames';
import { ProjectsProps } from './Projects.props';
import styles from './Projects.module.css';
import ProjectList from '@/components/ProjectList/ProjectList';
import { CreateProjectModal } from '@/components/CreateProjectModal/CreateProjectModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Projects = ({ className, ...props }: ProjectsProps): JSX.Element => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();

	return (
		<>
		<div className={cn(className, styles.projects)} {...props}>

			<button 
			onClick={() => setIsModalOpen(true)}
			className={styles.apply}>Создать проект</button>
			<div className={styles.list}>
			<ProjectList />
			</div>
			
		</div>

		  <CreateProjectModal isOpen={isModalOpen} onClose={() => {
			setIsModalOpen(false);
			console.log("refresh");
		//	router.replace('/projects');
	//	router.push('/projects')
		router.refresh();
		  }} />

          </>
	);
};