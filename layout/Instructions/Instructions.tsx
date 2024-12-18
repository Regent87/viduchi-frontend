'use client';

import cn from 'classnames';
import { InstructionsProps } from './Instructions.props';
import styles from './Instructions.module.css';
import ProjectList from '@/components/ProjectList/ProjectList';
import { CreateProjectModal } from '@/components/CreateProjectModal/CreateProjectModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateInstructionModal } from '@/components/CreateInstructionModal/CreateInstructionModal';

export const Instructions = ({ className, ...props }: InstructionsProps): JSX.Element => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();

	return (
		<>
		<div className={cn(className, styles.projects)} {...props}>

			<button 
			onClick={() => setIsModalOpen(true)}
			className={styles.apply}>Создать инструкцию</button>
			<div className={styles.list}>
			<ProjectList />
			</div>
			
		</div>

		  <CreateInstructionModal isOpen={isModalOpen} onClose={() => {
			setIsModalOpen(false);
			console.log("refresh");
		//	router.replace('/projects');
	//	router.push('/projects')
		// router.refresh();
	//	location.reload();
		  }} />

          </>
	);
};