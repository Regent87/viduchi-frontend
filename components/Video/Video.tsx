import { VideoProps } from './Video.props';
import styles from './Video.module.css';
import cn from 'classnames';
import { P } from '../P/P';
import MenuIcon from './menu.svg';
import PlayIcon from './play.svg';
import cover from '../../public/cover.png';
import Image from 'next/image';

export const Video = ({ videoModel, className, ...props }: VideoProps): JSX.Element => {
	return (
		<div className={cn(styles.video, className)} {...props}>
			<div className={styles.videoCover}>
				<Image src={cover} alt="cover" width={220} height={150} />
				<PlayIcon />
			</div>
			<P size="s" className={styles.videoInfo}>
				<span className={styles.videoCreated}>{videoModel.createdAt}</span>
				<span className={styles.menu}>
					<MenuIcon />
				</span>
			</P>
			<P size="m" className={styles.videoTitle}>{videoModel.title}</P>
		</div>
	);
};