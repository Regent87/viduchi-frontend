import { InstructionCardProps } from './InstructionCard.props';
import styles from './InstructionCard.module.css';
import cn from 'classnames';
import MenuIcon from './menu.svg';
import PlayIcon from './play.svg';
import cover from '../../public/cover.png';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { EditInstructionMenu } from '../EditInstructionMenu/EditInstructionMenu';

export const InstructionCard = ({ instructionModel, className, ...props }: InstructionCardProps) => {

	const [isEditOpen, setIsEditOpen] = useState(false);
	const closeDropdown = () => {
		setIsEditOpen(false);
	};

	const menuRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	const handleClickOutside = (event: MouseEvent) => {
	// 		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
	// 			setIsEditOpen(false);
	// 		}
	// 	};

	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, []);

	return (
		<>
			<div className={cn(styles.instruction, className)} {...props}>
				<div className={styles.instructionCover}>
					<Image src={instructionModel.cover_url ? instructionModel.cover_url : cover } alt="cover" width={220} height={150} />
					<PlayIcon />
				</div>
				<div className={styles.dateAndTitle}>
					<div className={styles.instructionTitle}>
						{ instructionModel.title }
					</div>
					<div className={styles.menuContainer} ref={menuRef}>
						<MenuIcon className={styles.menu} onClick={() => setIsEditOpen(!isEditOpen)} />
						{
							isEditOpen && (
								<EditInstructionMenu closeDropdown={closeDropdown}
								instruction={instructionModel}
								/>
							)
						}
					</div>
				</div>
			</div>
		</>
	);
};