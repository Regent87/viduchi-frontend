import { InstructionCardProps } from './InstructionCard.props';
import styles from './InstructionCard.module.css';
import cn from 'classnames';
import { P } from '../P/P';
import MenuIcon from './menu.svg';
import PlayIcon from './play.svg';
import cover from '../../public/cover.png';
import Image from 'next/image';
import { useState } from 'react';
import { EditInstructionMenu } from '../EditInstructionMenu/EditInstructionMenu';

export const InstructionCard = ({ instructionModel, className, ...props }: InstructionCardProps): JSX.Element => {

	const [isEditOpen, setIsEditOpen] = useState(false);
	const closeDropdown = () => {
		setIsEditOpen(false);
	};

	//console.log(projectModel)
	

	return (
		<>
		<div className={cn(styles.project, className)} {...props}>
			<div className={styles.projectCover}>
				<Image src={instructionModel.cover_url ? instructionModel.cover_url : cover } alt="cover" width={220} height={150} />
					
				<PlayIcon />
			</div>
			<div className={styles.dateAndTitle}>
			 <span className={styles.projectCreated}>
				{ instructionModel.title }
		
			 </span>
			<MenuIcon className={styles.menu} onClick={() => setIsEditOpen(!isEditOpen)} />
			
		
			</div>
			 <span className={styles.title}>
			{/* {instructionModel.title} */}
			</span> 

		
			
			
		
			

			{
	isEditOpen && (
		<EditInstructionMenu closeDropdown={closeDropdown}
		instruction={instructionModel}
		/>
	)
}
		</div>



</>
	);
};