"use client";

import { AddStepModalProps } from './AddStepModal.props';
import styles from './AddStepModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";

export const AddStepModal = ({ isOpen, onClose }: AddStepModalProps) => {

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title="">
            <form>
                <h2>Для добавления шага выберите начальный и конечный субтитр</h2>
            <div className={styles.buttons}>
           
 <button
 onClick={onClose}
className={styles.apply}>Понятно</button>
                </div>
            </form>

        </Modal>
    )
}
