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

        <section className={styles.infos}>
        <h3>Контактная информация</h3>
       <hr className={styles.white} />
            <div className={styles.infos_inner}>
            
        <div>
            <div className={styles.profileItem}>
            <p>Имя</p>
            <p className={styles.white}>Александр</p>
            </div>
            <div className={styles.profileItem}>
            <p>Корпоративная почта</p>
            <p className={styles.white}>izotov@gmail.com</p>
            </div>
            <div className={styles.profileItem}>
            <p>Должность</p>
            <p className={styles.white}>...</p>
            </div>
           
            
        </div>

        <div>
        <div className={styles.profileItem}>
            <p>Фамилия</p>
            <p className={styles.white}>Изотов</p>
            </div>
            <div className={styles.profileItem}>
            <p>Номер телефона</p>
            <p className={styles.white}>+795........</p>
            </div>

<div className={styles.change}>
<button>Изменить</button>
</div>

<div className={styles.delete}>
<span>Удалить профиль</span>
</div>
            
        </div>

       

          

            </div>
        </section>

        <div className={styles.userCard}>

        </div>

        </div>
       
        </>
    )
}