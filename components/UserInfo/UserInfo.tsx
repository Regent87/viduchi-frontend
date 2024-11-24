import { UserInfoProps } from './UserInfo.props';
import styles from './UserInfo.module.css';
import cn from 'classnames';
import Image from 'next/image';
import avatar from '../../public/user_avatar.png';
import ArrowDownIcon from './arrow-down.svg';

export const UserInfo = ({ className, ...props }: UserInfoProps): JSX.Element => {
	return (
		<div className={cn(className, styles.userInfo)} {...props}>
			<div className={styles.avatar}><Image src={avatar} alt="avatar" /></div>
			<div className={styles.info}>
				<div className={styles.name}>Александр Изотов</div>
				<div className={styles.email}>alexander.izotov@gmail.com</div>
			</div>
			<div className={styles.arrow}><ArrowDownIcon /></div>
		</div>
	);
};