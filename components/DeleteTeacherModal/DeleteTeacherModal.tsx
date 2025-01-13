"use client";

import { DeleteTeacherModalProps } from './DeleteTeacherModal.props';
import styles from './DeleteTeacherModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";

export const DeleteTeacherModal = ({ isOpen, onClose }: DeleteTeacherModalProps): JSX.Element => {

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
