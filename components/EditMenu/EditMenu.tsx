import { useState } from 'react';
import { EditStudentModal } from '../EditStudentModal/EditStudentModal';
import styles from './EditMenu.module.css';
import { DeleteStudentModal } from '../DeleteStudentModal/DeleteStudentModal';

export const EditMenu = ({closeDropdown, student}: any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openHandler = () => {
        setIsModalOpen(true);
    }

    const openDeleteHandler = () => {
        setIsDeleteModalOpen(true);
    }

    // работает
   // console.log("edit menu student: ", student)

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

<EditStudentModal isOpen={isModalOpen} onClose={() => {
    closeDropdown();
    setIsModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }}
  student={student}
  />

  <DeleteStudentModal
  isOpen={isDeleteModalOpen} onClose={() => {
    closeDropdown();
    setIsDeleteModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
}}
id={student.student.id}
/>
 </>
    )
}