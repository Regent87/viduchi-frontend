'use client';

import { useState } from 'react';
import styles from './CreateProjectModal.module.css';
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { CreateProjectModalProps } from './CreateProjectModal.props';
import { createProject } from '@/api/client/projects';
import { useRouter } from 'next/navigation';

export const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps): JSX.Element => {
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
      setIsLoading(true);

      const project = await createProject(projectName);
      console.log("project");
      console.log(project);

      setProjectName('');

      onClose();

      if (project) {
        console.log("project refresh");
        router.replace("/projects");
        router.push('/editor/' + project.id)
       // location.reload();
      }

      setIsLoading(false);

  };

  return (

    <Modal
    className={styles.white}
    isOpen={isOpen} onClose={onClose} title="+ Новый проект">
<form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}>
<div className={styles.addProject}>

<input
onChange={(e: any) => setProjectName(e.target.value)}
value={projectName}
placeholder='Введите название проекта'
type="text" required />



</div>

<div className={styles.buttons}>
<button
onClick={onClose}
className={styles.reset}>Отмена</button>
<button
disabled={isLoading || !projectName.trim()}
className={styles.apply}>Добавить</button>
</div>



</form>
        </Modal>

  );
};