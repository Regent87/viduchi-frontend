import { useState } from "react";
import Image from 'next/image';
import avatar from '../../../public/user_avatar.png';
import styles from './StudentCard.module.css';
import { EditMenu } from '../../EditMenu/EditMenu';
import DotsIcon from '../dots_icon.png';

export const TeacherCard = (teacher: any) => {

    const [isEditOpen, setIsEditOpen] = useState(false);

    const closeDropdown = () => {
        setIsEditOpen(false);
    };

    console.log("ONE teacher: ", teacher)

    return (

        <tr>
        <td className={styles.userImage}><Image src={avatar} alt='avatar' /> </td>
        <td>{teacher.teacher.first_name} {teacher.teacher.surname}</td>
        <td>{teacher.teacher.position.title}</td>
        <td>+37529788888</td>
        <td>{teacher.teacher.email}</td>
        <td>Проект 1, Мой проект</td>
        <td><Image
        onClick={() => setIsEditOpen(!isEditOpen)}
        className={styles.addStudent} src={DotsIcon} alt='add student' /></td>
        {
          isEditOpen && (
          <EditMenu key={teacher.id} closeDropdown={closeDropdown} teacher={teacher} />
          )
        }
        
      </tr>
    )
}