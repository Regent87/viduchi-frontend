"use client";

import { DeleteStudentModalProps } from "./DeleteStudentModal.props";
import styles from './DeleteStudentModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";

export const DeleteStudentModal = ({ isOpen, onClose }: DeleteStudentModalProps): JSX.Element => {

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title="+ Точно удалить ученика/">
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
