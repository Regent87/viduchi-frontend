import { UserPanelProps } from './UserPanel.props';
import styles from './UserPanel.module.css';
import cn from 'classnames';
import Link from 'next/link';
import ChatsIcon from './chats.svg';
import SettingsIcon from './settings.svg';
import NotificationsIcon from './notifications.svg';

export const UserPanel = ({ className, ...props }: UserPanelProps): JSX.Element => {
	return (
		<div className={cn(className, styles.userPanel)} {...props}>
			<Link href="/admin/profile" className={styles.link}>
				<ChatsIcon />
			</Link>
			<Link href="/admin/profile" className={styles.link}>
				<NotificationsIcon />
			</Link>
			<Link href="/admin/profile" className={styles.link}>
				<SettingsIcon />
			</Link>
		</div>
	);
};