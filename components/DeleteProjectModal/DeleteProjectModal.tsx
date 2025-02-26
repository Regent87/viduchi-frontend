// "use client";

import { DeleteProjectModalProps } from "./DeleteProjectModal.props";
import styles from './DeleteProjectModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import { deleteProject } from "@/api/client/projects";
import { useState } from "react";
import { Button } from "../Button/Button";

export const DeleteProjectModal = ({ isOpen, project, onClose }: DeleteProjectModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        const deleted = await deleteProject(project.id);
        if (deleted) {
            location.reload();

            onClose();
        }
        setIsLoading(false);
    }

    return (
        <Modal
            className={styles.white}
            isOpen={isOpen}
            onClose={onClose}
            title={`Точно удалить проект ${project.title}?`}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleDelete();
                }}>
                <div className={styles.buttons}>
                    <Button className={styles.button} appearance="ghost" onClick={onClose}>Нет</Button>
                    <Button className={styles.button} appearance="primary">Да</Button>
                </div>
            </form>

        </Modal>
    )
}
