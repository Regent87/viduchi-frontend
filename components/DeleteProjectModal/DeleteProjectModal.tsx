"use client";

import { DeleteProjectModalProps } from "./DeleteProjectModal.props";
import styles from './DeleteProjectModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";

export const DeleteProjectModal = ({ isOpen, project, onClose }: DeleteProjectModalProps): JSX.Element => {

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title={` Точно удалить ${project.title}?`}>
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
