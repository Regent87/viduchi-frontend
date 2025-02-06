import { useState } from "react";
import Image from 'next/image';
import avatar from '../../../public/user_avatar.png';
import styles from './StudentCard.module.css';
import { EditMenu } from '../../EditMenu/EditMenu';
import DotsIcon from '../dots_icon.png';

export const StudentCard = (student: any) => {

    const [isEditOpen, setIsEditOpen] = useState(false);

    const closeDropdown = () => {
        setIsEditOpen(false);
    };

    console.log("ONE STUDENT: ", student)

    return (
<>
        <tr>
        <td><Image className={styles.userImage} src={avatar} alt='avatar' /> </td>
        <td>{student.student.first_name} {student.student.surname}</td>
        <td>{student.student.position.title}</td>
        <td>{student.student.phone_number}</td>
        <td>{student.student.email}</td>
        <td>Проект 1, Мой проект</td>
        <td><Image
        onClick={() => setIsEditOpen(!isEditOpen)}
        className={styles.addStudent} src={DotsIcon} alt='add student' /></td>
      
      {
          isEditOpen && (
          <EditMenu key={student.id} closeDropdown={closeDropdown} student={student} />
          )
        }
      </tr>
      
        </>
    )
}