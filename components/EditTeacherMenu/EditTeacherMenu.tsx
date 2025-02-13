import { useState } from 'react';
import styles from './EditTeacherMenu.module.css';
import { DeleteTeacherModal } from '../DeleteTeacherModal/DeleteTeacherModal';
import { TeacherModel } from '@/interfaces/student.interface';
import { TeacherActionModal } from '../TeacherActionModal/TeacherActionModal';

export const EditTeacherMenu = ({closeDropdown, teacher}: {closeDropdown: () => void, teacher: TeacherModel}) => {

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
                        <span
                        onClick={onEditClickHandler}
                        >Редактирвать</span>
                    </li>
                    <li>
                        <span
                        onClick={onDeleteClickHandler}
                        >Удалить</span>
                    </li>
                </ul>
            </nav>
        </div>

            <TeacherActionModal
                mode="edit"
                isOpen={isModalOpen}
                onClose={() => {
                    closeDropdown();
                    setIsModalOpen(false);
                }}
                teacher={teacher}
            />

            <DeleteTeacherModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    closeDropdown();
                    setIsDeleteModalOpen(false);
                }}
                id={teacher.id}
            />
        </>
    )
}