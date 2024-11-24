import { AddVideoProps } from './AddVideo.props';
import styles from './AddVideo.module.css';
import cn from 'classnames';
import AddVideoIcon from './add-video.svg';
import { P } from '@/components/P/P';

export const AddVideo = ({ className, ...props }: AddVideoProps): JSX.Element => {
	return (
		<div className={cn(className, styles.addVideo)} {...props}>
			<P size="s" className={styles.addVideoText}>Нажмите, чтобы загрузить видео</P>
			<AddVideoIcon />
			<P size="s" className={styles.addVideoText}>или перетащите файл сюда</P>
		</div>
	);
};