'use client';

import cn from 'classnames';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import { Search } from '@/components';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { UserPanel } from '@/components/UserPanel/UserPanel';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	return (
    <div className={cn(className, styles.header)} {...props}>
      <Search className={styles.search} />
			<div className={styles.profile}>
				<UserPanel />
				<UserInfo />
			</div>
		</div>
	);
};