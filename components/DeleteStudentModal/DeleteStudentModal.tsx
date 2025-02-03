"use client";

import { DeleteStudentModalProps } from "./DeleteStudentModal.props";
import styles from './DeleteStudentModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import { deleteStudent } from "@/api/client/students";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";

export const DeleteStudentModal = ({ isOpen, onClose, id }: DeleteStudentModalProps) => {

    // zustand store
    const deleteStudentFromStore = useStore((state) => state.deleteStudent);

    const router = useRouter();

    const handleDelete = async () => {
      
        const deletedMessage = await deleteStudent(Number(id));
        onClose();
        if (deletedMessage) {
            deleteStudentFromStore(Number(id));
            router.push('/admin/students');       
        }
    }

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title="+ Точно удалить ученика?" >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete();
            }}
            >
            <div className={styles.buttons}>
                
            <button
className={styles.reset}>Да</button>
 <button
 onClick={() => onClose()}
className={styles.apply}>Нет</button>
                </div>
            </form>

        </Modal>
    )
}
