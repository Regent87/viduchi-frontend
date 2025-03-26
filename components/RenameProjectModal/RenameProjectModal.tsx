'use client';

import { useState } from 'react';
import styles from './RenameProjectModal.module.css';
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { RenameProjectModalProps } from './RenameProjectModal.props';
import { updateProjectTitle } from '@/api/client/projects';
import { P } from '../P/P';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export const RenameProjectModal = ({ isOpen, project, onClose }: RenameProjectModalProps): JSX.Element => {
  const [projectName, setProjectName] = useState(project.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
      setIsLoading(true);

      const newProjectTitle = await updateProjectTitle(project.id, projectName);

      if (newProjectTitle) {
        location.reload();
        setProjectName('');

        onClose();

        setIsLoading(false);
      }
  };

    return (
        <Modal
            className={styles.white}
            isOpen={isOpen}
            onClose={onClose}
            title={"+ Редактирование"}>
            <form className={styles.form}>
                <div>
                    <P size="s">Название проекта</P>
                    <Input
                        style={{ width: '100%' }}
                        type="text"
                        placeholder="Введите название проекта"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.buttons}>
                    <Button
                        appearance="ghost"
                        onClick={onClose}
                    >
                        Отменить
                    </Button>
                    <Button
                        appearance="primary"
                        onClick={handleSubmit}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </Modal>
    )
}