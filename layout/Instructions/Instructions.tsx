'use client';

import cn from 'classnames';
import { InstructionsProps } from './Instructions.props';
import styles from './Instructions.module.css';
import ProjectList from '@/components/ProjectList/ProjectList';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateInstructionModal } from '@/components/CreateInstructionModal/CreateInstructionModal';
import InstructionList from '@/components/InstructionList/InstructionList';
import { CreateProjectModal } from '@/components/CreateProjectModal/CreateProjectModal';

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
			<InstructionList />
			</div>
			
		</div>

		  <CreateProjectModal isOpen={isModalOpen} onClose={() => {
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