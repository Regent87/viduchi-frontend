import { ProjectCardProps } from './ProjectCard.props';
import styles from './ProjectCard.module.css';
import cn from 'classnames';
import MenuIcon from './menu.svg';
import PlayIcon from './play.svg';
import cover from '../../public/cover.png';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { EditProjectMenu } from '../EditProjectMenu/EditProjectMenu';
import { P } from '../P/P';

export const ProjectCard = ({ projectModel, className, ...props }: ProjectCardProps): JSX.Element => {

	const [isEditOpen, setIsEditOpen] = useState(false);
	const closeDropdown = () => {
		setIsEditOpen(false);
	};

	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsEditOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className={cn(styles.project, className)} {...props}>
				<div className={styles.projectCover}>
					<Image src={projectModel.cover_url ? projectModel.cover_url : cover } alt="cover" width={220} height={150} />

					<PlayIcon />
				</div>
				<div className={styles.dateAndTitle}>
					<div className={styles.projectCreated}>
						{projectModel.date.substring(0, 10) }
					</div>
					<div className={styles.menuContainer}>
						<MenuIcon className={styles.menu} onClick={() => setIsEditOpen(!isEditOpen)} />
						{
							isEditOpen && (
								<EditProjectMenu key={projectModel.id} closeDropdown={closeDropdown}
								project={projectModel}
								/>
							)
						}
					</div>
				</div>
				<P size="l" className={styles.title}>
					{projectModel.title}
				</P>

			</div>
		</>
	);
};