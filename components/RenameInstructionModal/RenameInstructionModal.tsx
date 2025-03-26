'use client';

import { useState } from 'react';
import styles from './RenameInstructionModal.module.css';
import { Modal } from '@/components/site/ModalForm/ModalForm';
// import { Button } from '@/components/Button/Button';
// import { Input } from '@/components/Input/Input';
import { RenameInstructionModalProps } from './RenameInstructionModal.props'; 
// import { createProject } from '@/api/client/projects';
import { useRouter } from 'next/navigation';
import { updateInstructionTitle } from '@/api/client/instructions';
import useStore from '@/store/store';

export const RenameInstructionModal = ({ isOpen, instruction, onClose }: RenameInstructionModalProps): JSX.Element => {
  const [instructionName, setInstructionName] = useState(instruction.title);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  // zustand store
  const updateInstruction = useStore((state) => state.updateInstruction);


  const handleSubmit = async () => {
      setIsLoading(true);

    //   const project = await createProject(projectName);
    //   console.log("project");
    //   console.log(project);

      

      onClose();

      // const newInstructionTitle = await updateInstructionTitle(instruction.id, instructionName);
      await updateInstructionTitle(instruction.id, instructionName);

    //  if (newInstructionTitle) {
       
        updateInstruction(instruction.id, instructionName);
        router.push('/instructions');
     // }

      setInstructionName('');
      setIsLoading(false);

  };

  return (

    <Modal
    className={styles.white}
    isOpen={isOpen} onClose={onClose} title="+ Изменить инструкцию">
<form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}>
<div className={styles.addProject}>

<input
onChange={(e: any) => setInstructionName(e.target.value)}
value={instructionName}
placeholder='Введите название инструкции'
type="text" required />



</div>

<div className={styles.buttons}>
<button
onClick={onClose}
className={styles.reset}>Отмена</button>
<button
disabled={isLoading || !instructionName.trim()}
className={styles.apply}>Сохранить</button>
</div>



</form>
        </Modal>


  );
};