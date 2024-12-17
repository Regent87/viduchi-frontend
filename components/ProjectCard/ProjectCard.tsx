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

	return (
		<>
		<div className={cn(styles.project, className)} {...props}>
			<div className={styles.projectCover}>
				<Image src={cover} alt="cover" width={220} height={150} />
					
				<PlayIcon />
			</div>
			<P size="s" className={styles.projectInfo}>
				<span className={styles.projectCreated}>{projectModel.createdAt}</span>
				<span className={styles.menu}>
					<MenuIcon onClick={() => setIsEditOpen(!isEditOpen)} />
				</span>
			</P>
			
			<P size="m" className={styles.projectTitle}>{projectModel.title}</P>
			

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