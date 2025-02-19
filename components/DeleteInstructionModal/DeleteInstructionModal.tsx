"use client";

import { DeleteInstructionModalProps } from './DeleteInstructionModal.props'; 
import styles from './DeleteInstructionModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";

export const DeleteInstructionModal = ({ isOpen, instruction, onClose }: DeleteInstructionModalProps): JSX.Element => {

    const handleDeleteInstruction = () => {
        
    }

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title={` Точно удалить ${instruction.title}?`}>
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
