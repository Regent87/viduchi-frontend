"use client";

import { DeleteInstructionModalProps } from './DeleteInstructionModal.props'; 
import styles from './DeleteInstructionModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import useStore from '@/store/store';
import { useRouter } from "next/navigation";
import { deleteInstruction, getAllInstructions } from '@/api/client/instructions';

export const DeleteInstructionModal = ({ isOpen, instruction, onClose }: DeleteInstructionModalProps): JSX.Element => {
     const router = useRouter();
    // zustan store
    const setInstructions = useStore((state) => state.setAllInstructions);

    const handleDeleteInstruction = async () => {

        const deleted = await deleteInstruction(instruction.id);
        onClose();
        if (deleted) {
            const fetchInstructions = async () => {
            
                // setIsLoading(true);
                 const instructions = await getAllInstructions();
                 setInstructions(instructions);
               //  setIsLoading(false);
             }
             fetchInstructions();
             router.push('/instructions');
        }
         
    }

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title={` Точно удалить ${instruction.title}?`}>
            <form
             onSubmit={(e) => {
                e.preventDefault();
                handleDeleteInstruction();
            }}
            >
            <div className={styles.buttons}>
            <button
className={styles.reset}>Да</button>
 <button
  onClick={onClose}
className={styles.apply}>Нет</button>
                </div>
            </form>

        </Modal>
    )
}
