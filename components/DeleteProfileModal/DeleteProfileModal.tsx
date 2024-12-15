"use client";

import { DeleteProfileModalProps } from './DeleteProfileModal.props';
import styles from './DeleteProfileModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";

export const DeleteProfileModal = ({ isOpen, onClose }: DeleteProfileModalProps): JSX.Element => {

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title="+ Точно удалить профиль?">
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
