// "use client";

import { DeleteProjectModalProps } from "./DeleteProjectModal.props";
import styles from './DeleteProjectModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import { deleteProject } from "@/api/client/projects";
import { useRouter } from "next/navigation"

export const DeleteProjectModal = ({ isOpen, project, onClose }: DeleteProjectModalProps) => {

    const router = useRouter();

    const handleDelete = async () => {
       
       const deleted = await deleteProject(project.id);
       onClose();
       if (deleted) {
        router.push('/projects');
       }
     
    }

    return (
        <Modal className={styles.white}
        isOpen={isOpen} onClose={onClose} title={` Точно удалить ${project.title}?`}>
            <form 
            onSubmit={(e) => {
                e.preventDefault();
                handleDelete();
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
