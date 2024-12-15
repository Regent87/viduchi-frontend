import { useState } from 'react';
import { EditStudentModal } from '../EditStudentModal/EditStudentModal';
import styles from './EditMenu.module.css';

export const EditMenu = ({closeDropdown}: any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openHandler = () => {
        setIsModalOpen(true);
        
    }

    return (
        <>
       
        <div className={styles.edit}>
            <nav>
                <ul>
                    <li>
                        <span
                        onClick={openHandler}
                        >Редактирвать</span>
                    </li>
                    <li>
                        <span
                        onClick={closeDropdown}
                        >Удалить</span>
                    </li>
                </ul>
            </nav>
        </div>

<EditStudentModal isOpen={isModalOpen} onClose={() => {
    closeDropdown();
    setIsModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />
 </>
    )
}