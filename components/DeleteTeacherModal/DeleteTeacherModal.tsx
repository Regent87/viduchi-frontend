"use client";

import { DeleteTeacherModalProps } from './DeleteTeacherModal.props';
import styles from './DeleteTeacherModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import { useRouter } from "next/navigation";
import { deleteMentor } from '@/api/client/mentors';

export const DeleteTeacherModal = ({ isOpen, onClose, id }: DeleteTeacherModalProps)=> {

    const router = useRouter();

        const handleDelete = async () => {
          
            const deletedMessage = await deleteMentor(Number(id));
            onClose();
            if (deletedMessage) {
                router.push('/admin/students');       
            }
        }

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title="+ Точно удалить наставника?">
            <form>
            <div className={styles.buttons}>
            <button
className={styles.reset}>Да</button>
 <button
className={styles.apply}>Нет</button>
                </div>
            </form>

        </Modal>
    )
}
