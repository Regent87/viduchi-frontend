"use client";

import { EmptyPlayerModalProps } from './EmptyPlayerModal.props';
import styles from './EmptyPlayerModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";

export const EmptyPlayerModal = ({ isOpen, onClose }: EmptyPlayerModalProps) => {

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title="Для создания инструкции необходимо импортировать видеофайл">
            <form>

            <div className={styles.buttons}>
           
 <button
 onClick={onClose}
className={styles.apply}>Импортировать видео</button>

                </div>

            </form>

        </Modal>
    )
}
