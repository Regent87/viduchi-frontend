import { useState } from 'react';
import styles from './EditTeacherMenu.module.css';
import { EditTeacherModal } from '../EditTeacherModal/EditTeacherModal';
import { DeleteTeacherModal } from '../DeleteTeacherModal/DeleteTeacherModal';

export const EditTeacherMenu = ({closeDropdown, teacher}: any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openHandler = () => {
        setIsModalOpen(true);
    }

    const openDeleteHandler = () => {
        setIsDeleteModalOpen(true);
    }

    return (
        <>
       
        <td className={styles.edit}>
            <nav>
                <ul>
                    <li>
                        <span
                        onClick={openHandler}
                        >Редактирвать</span>
                    </li>
                    <li>
                        <span
                        onClick={openDeleteHandler}
                        >Удалить</span>
                    </li>
                </ul>
            </nav>
        </td>

<EditTeacherModal isOpen={isModalOpen} onClose={() => {
    closeDropdown();
    setIsModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
 
  }} 
  teacher={teacher}
  />

  <DeleteTeacherModal
  isOpen={isDeleteModalOpen} onClose={() => {
    closeDropdown();
    setIsDeleteModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  
}}
id={teacher.teacher.id}
/>
 </>
    )
}