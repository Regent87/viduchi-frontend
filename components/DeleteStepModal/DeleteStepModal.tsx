"use client";

import { DeleteStepModalProps } from './DeleteStepModal.props';
import styles from './DeleteStepModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import useStore from '@/store/store';

export const DeleteStepModal = ({ isOpen, onClose, stepId }: DeleteStepModalProps) => {


    const deleteStep = useStore((state) => state.deleteStep);

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title="Удаление шага">
            <form>
                <p>Вы точно хотите удалить шаг?</p>
           
           
           <div className={styles.buttons}>
           <button
 onClick={onClose}
className={styles.reset}>Нет</button>
 <button
 onClick={() => {
   deleteStep(stepId);
   onClose();
 }}
className={styles.apply}>Да</button>
           </div>

               
            </form>

        </Modal>
    )
}
