import { ProjectCardProps } from './ProjectCard.props';
import styles from './ProjectCard.module.css';
import cn from 'classnames';
import { P } from '../P/P';
import MenuIcon from './menu.svg';
import PlayIcon from './play.svg';
import cover from '../../public/cover.png';
import Image from 'next/image';
import { useState } from 'react';
import { EditProjectMenu } from '../EditProjectMenu/EditProjectMenu';

export const ProjectCard = ({ projectModel, className, ...props }: ProjectCardProps): JSX.Element => {

	const [isEditOpen, setIsEditOpen] = useState(false);
	const closeDropdown = () => {
		setIsEditOpen(false);
	};

	console.log(projectModel)
	

	return (
		<>


		{/* <div className={cn(styles.project, className)} {...props}>
			<div className={styles.projectCover}>
				<Image src={cover} alt="cover" width={220} height={150} />
					
				<PlayIcon />
			</div>
			<span className={styles.projectCreated}>{projectModel.date.substring(0, 10) }

			
			</span>

			<P size="s" className={styles.projectInfo}>
			
			<P size="m" className={styles.projectTitle}>{projectModel.title}</P>
			<span className={styles.menu}>
				<MenuIcon onClick={() => setIsEditOpen(!isEditOpen)} />
			</span>
		</P> */}
			
			
			<div className={cn(styles.project, className)} {...props}>
			<div className={styles.projectCover}>
				<Image src={cover} alt="cover" width={220} height={150} />
					
				<PlayIcon />
			</div>
			<div className={styles.dateAndTitle}>
			<span className={styles.projectCreated}>{projectModel.date.substring(0, 10) }
		
			</span>
			<MenuIcon className={styles.menu} onClick={() => setIsEditOpen(!isEditOpen)} />
			
		
			</div>
			<span className={styles.title}>
			{projectModel.title}
			</span>

			

			{
	isEditOpen && (
		<EditProjectMenu closeDropdown={closeDropdown}
		project={projectModel}
		/>
	)
}
		</div>



</>
	);
};