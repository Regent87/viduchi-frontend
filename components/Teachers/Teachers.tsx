"use client";

import styles from './Teachers.module.css';
import avatar from '../../public/user_avatar.png';
import Image from 'next/image';
import DotsIcon from './dots_icon.png';
import { useState } from 'react';
import { EditTeacherMenu } from '../EditTeacherMenu/EditTeacherMenu';
import { CreateTeacherModal } from '../CreateTeacherModal/CreateTeacherModal';

export const Teachers = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEdit2Open, setIsEdit2Open] = useState(false);

    const closeDropdown = () => {
      setIsEditOpen(false);
  };

  const closeDropdown2 = () => {
    setIsEdit2Open(false);
};

    return (
        <>
        <table className={styles.students}>
  <tr>
    <th></th>
    <th>Наставник</th>
    <th>Должность</th>
    <th>Номер телефона</th>
    <th>E-mail</th>
    <th>Назначенные проекты</th>
    <th></th>
  </tr>
  <tr>
    <td className={styles.userImage}><Image src={avatar} alt='avatar' /> </td>
    <td> Александр Изотов</td>
    <td>Электрик</td>
    <td>+37529788888</td>
    <td>izotov@gmail.com</td>
    <td>Проект 1, Мой проект</td>
    <td><Image
    onClick={() => setIsEditOpen(!isEditOpen)}
    className={styles.addStudent} src={DotsIcon} alt='add student' /></td>
    {
      isEditOpen && (
      <EditTeacherMenu closeDropdown={closeDropdown} />
      )
    }
    
  </tr>
  <tr>
  <td className={styles.userImage}><Image src={avatar} alt='avatar' /> </td>
    <td>Антон Осипов</td>
    <td>Электрик</td>
    <td>+37529788888</td>
    <td>osipov@gmail.com</td>
    <td>Мой проект</td>
    <td><Image onClick={() => setIsEdit2Open(!isEdit2Open)}
    className={styles.addStudent}
    src={DotsIcon} alt='add student' /></td>
    {
      isEdit2Open && (
      <EditTeacherMenu closeDropdown={closeDropdown2} />
      )
    }
  </tr>
</table>


<button
onClick={() => setIsModalOpen(true)}
className={styles.addStudentButton}>
    Добавить наставника
</button>

<CreateTeacherModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        console.log("refresh");
      //  router.replace('/projects');
      }} />
</>
    )
}