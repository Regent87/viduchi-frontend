import { UserInfoProps } from './UserInfo.props';
import styles from './UserInfo.module.css';
import cn from 'classnames';
import Image from 'next/image';
import avatar from '../../public/user_avatar.png';
import ArrowDownIcon from './arrow-down.svg';
import { useEffect, useState } from 'react';
import { getMyProfile } from '@/api/client/admins';

export const UserInfo = ({ className, ...props }: UserInfoProps): JSX.Element => {

	const [myInfo, setMyInfo] = useState<any>({});

	useEffect(() => {
		  const fetchMyProfile = async () => {
								
					
								const profile = await getMyProfile();
								setMyInfo(profile);
					
							};
							fetchMyProfile();
						   
	}, [])




	return (
		<div className={cn(className, styles.userInfo)} {...props}>
			<div className={styles.avatar}><Image src={avatar} alt="avatar" /></div>
			<div className={styles.info}>
				<div className={styles.name}>{myInfo.first_name} {myInfo.surname}</div>
				<div className={styles.email}>{myInfo.email}</div>
			</div>
			<div className={styles.arrow}><ArrowDownIcon /></div>
		</div>
	);
};