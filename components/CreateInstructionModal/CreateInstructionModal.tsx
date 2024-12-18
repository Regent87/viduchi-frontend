'use client';

import { useState } from 'react';
import styles from './CreateInstructionModal.module.css';
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { CreateInstructionModalProps } from './CreateInstructionModal.props';
// import { createProject } from '@/api/client/projects';
import { useRouter } from 'next/navigation';

export const CreateInstructionModal = ({ isOpen, onClose }: CreateInstructionModalProps): JSX.Element => {
  const [instructionName, setInstructionName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
      setIsLoading(true);

    //   const project = await createProject(projectName);
    //   console.log("project");
    //   console.log(project);

      setInstructionName('');

      onClose();

    //   if (project) {
    //     console.log("project refresh");
    //     router.replace("/projects");
    //     location.reload();
    //   }

      setIsLoading(false);

  };

  return (

    <Modal
    className={styles.white}
    isOpen={isOpen} onClose={onClose} title="+ Новая инструкция">
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
className={styles.apply}>Добавить</button>
</div>



</form>
        </Modal>

  );
};