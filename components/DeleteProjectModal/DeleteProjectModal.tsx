// "use client";

import { DeleteProjectModalProps } from "./DeleteProjectModal.props";
import styles from './DeleteProjectModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import { deleteProject, getProjects } from "@/api/client/projects";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";

export const DeleteProjectModal = ({ isOpen, project, onClose }: DeleteProjectModalProps) => {

    // suztan store
    const setProjects = useStore((state) => state.setAllProjects);

    const router = useRouter();

    const handleDelete = async () => {
       
       const deleted = await deleteProject(project.id);
       onClose();
       if (deleted) {
        const fetchProjects = async () => {
                    const projects = await getProjects();
                    setProjects(projects);
                };
                fetchProjects();
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
