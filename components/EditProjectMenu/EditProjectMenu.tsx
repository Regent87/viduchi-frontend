import { useState } from 'react';
import styles from './EditProjectMenu.module.css';
import { useRouter } from 'next/navigation';
import { RenameProjectModal } from '../RenameProjectModal/RenameProjectModal';
import { DeleteProjectModal } from '../DeleteProjectModal/DeleteProjectModal';

export const EditProjectMenu = ({closeDropdown, project}: any) => {

    const [isRenameModelOpen, setIsRenameModelOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const router = useRouter();

    const editProjectHandler = () => {
        router.push(`/editor/${project.id}`)
    }

    const openRenameHandler = () => {
        setIsRenameModelOpen(true);
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
                            <span onClick={editProjectHandler}>Редактировать</span>
                        </li>
                        <li>
                            <span onClick={openRenameHandler}>Переименовать</span>
                        </li>
                        <li>
                            <span onClick={openDeleteHandler}>Удалить</span>
                        </li>
                    </ul>
                </nav>
            </div>

            {isRenameModelOpen && <RenameProjectModal
                isOpen={isRenameModelOpen}
                project={project}
                onClose={() => {
                    closeDropdown();
                    setIsRenameModelOpen(false);
                }}/>
            }

            {isDeleteModalOpen && <DeleteProjectModal
                isOpen={isDeleteModalOpen}
                project={project}
                onClose={() => {
                    closeDropdown();
                    setIsDeleteModalOpen(false);
                }} />
            }
        </>
    )
}