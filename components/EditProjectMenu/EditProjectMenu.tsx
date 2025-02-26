import { useState } from 'react';
import styles from './EditProjectMenu.module.css';
import { useRouter } from 'next/navigation';
import { RenameProjectModal } from '../RenameProjectModal/RenameProjectModal';
import { DeleteProjectModal } from '../DeleteProjectModal/DeleteProjectModal';

export const EditProjectMenu = ({closeDropdown, project}: any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const router = useRouter();

    const editProjectHandler = () => {
        router.push(`/editor/${project.id}`)
    }

    const openHandler = () => {
        setIsModalOpen(true);
    }

    const openDeleteHandler = () => {
        setIsDeleteModalOpen(true);
    }

    return (
        <>

        <div className={styles.edit}>
            <nav>
                <ul>
                <li>
                    <span
                    onClick={editProjectHandler}
                        >Редактировать</span>
                    </li>
                    <li>
                        <span
                        onClick={openHandler}
                        >Переименовать</span>
                    </li>
                    <li>
                        <span
                        onClick={openDeleteHandler}
                        >Удалить</span>
                    </li>
                </ul>
            </nav>
        </div>

<RenameProjectModal isOpen={isModalOpen} project={project} onClose={() => {
    setIsModalOpen(false);
    console.log("RenameProjectModal onClose");
  }} />

  <DeleteProjectModal
  isOpen={isDeleteModalOpen} project={project} onClose={() => {
    closeDropdown();
    setIsDeleteModalOpen(false);
    console.log("refresh");
}} />
 </>
    )
}