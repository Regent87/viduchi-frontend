"use client";

import { useState, useEffect } from 'react';
import styles from './AdminInfo.module.css'
import Image from 'next/image';
import avatar from '../../public/user_avatar.png';
import EditIcon from './edit.png';
import DeleteIcon from './delete.png';
import rectAdminImg from './rectadmin.png';
import Link from 'next/link';
import { AdminInfoProps } from './AdminInfo.props';
import { EditAdminModal } from '../EditAdminModal/EditAdminModal';
import { DeleteProfileModal } from '../DeleteProfileModal/DeleteProfileModal';
import { getMyProfile, uploadAdminAvatar } from '@/api/client/admins';


export const AdminInfo = ({ className, ...props }: AdminInfoProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const closeDropdown = () => {
        setIsModalOpen(false);
    }

    const closeDeleteDropdown = () => {
        setIsDeleteModalOpen(false);
    }

    // handle file for avatar
    const handleFileChange = async (newFiles: File[]) => {
        const file = newFiles[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar_file', file);

        const message = await uploadAdminAvatar(formData);

        // if (message) {
        //     const updatedProfile = await getMyProfile();
        //     setMyInfo(updatedProfile);
        // }
    
      }; 

     // get all positions
     const [isLoading, setIsLoading] = useState(false);
        const [myInfo, setMyInfo] = useState<any>({});
    
        useEffect(() => {
    
            const fetchPositions = async () => {
                        setIsLoading(true);
            
                        const profile = await getMyProfile();
                        setMyInfo(profile);
            
                        setIsLoading(false);
                    };
                    fetchPositions();
                   
    
        }, [])



    return (
        <>
        <div className={styles.adminInfo} {...props}>
            <div className={styles.userPhoto}>

          
        <div className={styles.profilePic}>
        <div className={styles.avatar}><Image
        src={avatar}
      alt="avatar" /></div>
        <input
              style={{ display: "none" }}
              id="file-upload-handle"
              accept="image/*"
              type="file"
              onChange={(e) =>
                handleFileChange(Array.from(e.target.files || []))
              }
            />
        <label htmlFor="file-upload-handle" className={styles.link}>
				<Image width={50} style={{ width: "50px" }} className={styles.edit} src={EditIcon} alt='Edit profile' title='Загрузить фото' />
			</label>
        </div>
        <div className={styles.rectangle}>
            <Image src={rectAdminImg} alt='rectangle'/>
            <p className={styles.userRole}>{myInfo.role}</p>
        </div>
        </div>

        <section className={styles.infos}>
        <h3>Контактная информация</h3>
       <hr className={styles.white} />
            <div className={styles.infos_inner}>
            
        <div>
            <div className={styles.profileItem}>
            <p>Имя</p>
            <p className={styles.white}>{myInfo.first_name}</p>
            </div>
            <div className={styles.profileItem}>
            <p>Корпоративная почта</p>
            <p className={styles.white}>{myInfo.email}</p>
            </div>
            <div className={styles.profileItem}>
            <p>Должность</p>
            <p className={styles.white}>{myInfo.role}.</p>
            </div>
           
            
        </div>

        <div>
        <div className={styles.profileItem}>
            <p>Фамилия</p>
            <p className={styles.white}>{myInfo.surname}</p>
            </div>
            <div className={styles.profileItem}>
            <p>Номер телефона</p>
            <p className={styles.white}>{myInfo.phone_number}</p>
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