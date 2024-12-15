"use client";

import styles from './AdminInfo.module.css'
import Image from 'next/image';
import avatar from '../../public/user_avatar.png';
import EditIcon from './edit.png';
import DeleteIcon from './delete.png';
import rectAdminImg from './rectadmin.png';
import Link from 'next/link';
import { AdminInfoProps } from './AdminInfo.props';
import { EditAdminModal } from '../EditAdminModal/EditAdminModal';
import { useState } from 'react';
import { DeleteProfileModal } from '../DeleteProfileModal/DeleteProfileModal';



export const AdminInfo = ({ className, ...props }: AdminInfoProps): JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const closeDropdown = () => {
        setIsModalOpen(false);
    }

    const closeDeleteDropdown = () => {
        setIsDeleteModalOpen(false);
    }

    return (
        <>
        <div className={styles.adminInfo} {...props}>
            <div className={styles.userPhoto}>

          
        <div className={styles.profilePic}>
        <div className={styles.avatar}><Image src={avatar} alt="avatar" /></div>
        <Link href="/admin/uploadphoto" className={styles.link}>
				<Image className={styles.edit} src={EditIcon} alt='Edit profile' title='Загрузить фото' />
			</Link>
        </div>
        <div className={styles.rectangle}>
            <Image src={rectAdminImg} alt='rectangle'/>
            <p className={styles.userRole}>Super Admin</p>
        </div>
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
<button
onClick={() => setIsModalOpen(true)}
>Изменить</button>
</div>


            
        </div>

     
          

            </div>
           
        </section>

      
{/* 
        <div className={styles.delete}>
<Image src={DeleteIcon} alt='Edit profile' />
<span>Удалить профиль</span>
</div> */}

        {/* <div className={styles.userCard}>

        </div> */}


  {/* <div></div> */}

       

        </div>
        <div 
      
        className={styles.delete}>
      
            <Image src={DeleteIcon} alt='Delete profile' />
            <span 
              onClick={() => setIsDeleteModalOpen(true)}
            >Удалить профиль</span>
          

</div>

<EditAdminModal isOpen={isModalOpen} onClose={() => {
    closeDropdown();
    setIsModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />

  <DeleteProfileModal isOpen={isDeleteModalOpen} onClose={() => {
    closeDeleteDropdown();
    setIsDeleteModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />
        </>
    )
}