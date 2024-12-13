import styles from './AdminInfo.module.css'
import Image from 'next/image';
import avatar from '../../public/user_avatar.png';
import EditIcon from './edit.png';
import Link from 'next/link';
import { AdminInfoProps } from './AdminInfo.props';


export const AdminInfo = ({ className, ...props }: AdminInfoProps): JSX.Element => {

    return (
        <>
        <div className={styles.adminInfo} {...props}>
        <div className={styles.profilePic}>
        <div className={styles.avatar}><Image src={avatar} alt="avatar" /></div>
        <Link href="/admin/uploadphoto" className={styles.link}>
				<Image className={styles.edit} src={EditIcon} alt='Edit profile' title='Загрузить фото' />
			</Link>
        </div>

        <div className={styles.userCard}>

        </div>

        </div>
       
        </>
    )
}