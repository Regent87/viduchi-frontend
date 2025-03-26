"use client";

import { PlayInstructionModalProps } from './PlayInstructionModal.props'; 
import styles from './PlayInstructionModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import useStore from '@/store/store';
import { useRouter } from "next/navigation";
import { deleteInstruction, getAllInstructions } from '@/api/client/instructions';

export const PlayInstructionModal = ({ isOpen, instruction, onClose }: PlayInstructionModalProps) => {
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
        isOpen={isOpen} onClose={onClose} title={`${instruction.title}`}>

<video 
width="520" 
height="340" 
controls 
src={instruction.video_url}></video>



        </Modal>
    )
}
