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
				<Image src={cover} alt="cover" width={220} height={150} />
					
				<PlayIcon />
			</div>
			<span className={styles.projectCreated}>{instructionModel.date.substring(0, 10) }

			
			</span>

			<P size="s" className={styles.projectInfo}>
			
			<P size="m" className={styles.projectTitle}>{instructionModel.title}</P>
			<span className={styles.menu}>
				<MenuIcon onClick={() => setIsEditOpen(!isEditOpen)} />
			</span>
		</P>
			
			
		
			

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