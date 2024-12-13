'use client';

import cn from 'classnames';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import { Search } from '@/components';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { UserPanel } from '@/components/UserPanel/UserPanel';
import { useState } from 'react';
import { UserMenu } from '@/components/UserMenu/UserMenu';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

	const [isShown, setIsShown] = useState(false);

	return (
		<>
  <div className={cn(className, styles.header)} {...props}>
      <Search className={styles.search} />
			<div className={styles.profile}>
				<UserPanel />
				<UserInfo
				onClick={() => setIsShown(!isShown)}
				/>


			</div>
		
		</div>

		{   
		  isShown && (
			<UserMenu />
		  )
				
			}
		</>
  
	);
};