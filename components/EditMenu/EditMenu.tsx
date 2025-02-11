import { useState } from 'react';
import styles from './EditMenu.module.css';
import { DeleteStudentModal } from '../DeleteStudentModal/DeleteStudentModal';
import { StudentModel } from '../../interfaces/student.interface';
import { StudentActionModal } from '../StudentActionModal/StudentActionModal';

export const EditMenu = ({closeDropdown, student}: {closeDropdown: () => void, student: StudentModel}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const onEditClickHandler = () => {
        setIsModalOpen(true);
    }

    const onDeleteClickHandler = () => {
        setIsDeleteModalOpen(true);
    }

    return (
        <>
            <div className={styles.edit}>
                <nav>
                    <ul>
                        <li>
                            <span onClick={onEditClickHandler}>Редактировать</span>
                        </li>
                        <li>
                            <span onClick={onDeleteClickHandler}>Удалить</span>
                        </li>
                    </ul>
                </nav>
            </div>

            <StudentActionModal
                mode="edit"
                isOpen={isModalOpen}
                onClose={() => {
                    closeDropdown();
                    setIsModalOpen(false);
                }}
                student={student}
            />

            <DeleteStudentModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    closeDropdown();
                    setIsDeleteModalOpen(false);
                }}
                id={student.id}
            />
        </>
    )
}