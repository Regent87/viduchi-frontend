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

export const RenameInstructionModal = ({ isOpen, instruction, onClose }: RenameInstructionModalProps): JSX.Element => {
  const [projectName, setProjectName] = useState(instruction.title);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
      setIsLoading(true);

    //   const project = await createProject(projectName);
    //   console.log("project");
    //   console.log(project);

      setProjectName('');

      onClose();

      const newInstructionTitle = await updateInstructionTitle(instruction.id, instruction.title);

      if (newInstructionTitle) {
        // console.log("project refresh");
        // router.replace("/projects");
        // location.reload();
        router.push('/instructions');
      }

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
onChange={(e: any) => setProjectName(e.target.value)}
value={projectName}
placeholder='Введите название инструкции'
type="text" required />



</div>

<div className={styles.buttons}>
<button
onClick={onClose}
className={styles.reset}>Отмена</button>
<button
disabled={isLoading || !projectName.trim()}
className={styles.apply}>Сохранить</button>
</div>



</form>
        </Modal>


  );
};