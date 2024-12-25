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

      setProjectName('');

      onClose();

      if (project) {
        router.replace("/projects");
      }

      setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="+ Новый проект">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Введите название проекта"
          style={{ width: '100%' }}
        />
        <div className={styles.buttons}>
          <Button type="button" appearance="ghost" onClick={onClose}>
            Отменить
          </Button>
          <Button
            type="submit"
            appearance="primary"
            disabled={isLoading || !projectName.trim()}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};