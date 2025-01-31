import { useState } from 'react';
import styles from './EditProjectMenu.module.css';
import { EditTeacherModal } from '../EditTeacherModal/EditTeacherModal';
import { DeleteTeacherModal } from '../DeleteTeacherModal/DeleteTeacherModal';
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

   // console.log("Project in menu: ", project)

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
    closeDropdown();
    setIsModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />

  <DeleteProjectModal
  isOpen={isDeleteModalOpen} project={project} onClose={() => {
    closeDropdown();
    setIsDeleteModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
}} />
 </>
    )
}