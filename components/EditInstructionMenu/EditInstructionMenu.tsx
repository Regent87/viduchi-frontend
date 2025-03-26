import { useState } from 'react';
import styles from './EditInstructionMenu.module.css';
import { useRouter } from 'next/navigation';
import { RenameInstructionModal } from '../RenameInstructionModal/RenameInstructionModal';
import { DeleteInstructionModal } from '../DeleteInstructionModal/DeleteInstructionModal';
import { AddStudentToInstructionModal } from '../AddStudentToInstructionModal/AddStudentToInstructionModal';
import { PlayInstructionModal } from '../PlayInstructionModal/PlayInstructionModal';

export const EditInstructionMenu = ({closeDropdown, instruction}: any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

    const router = useRouter();

    const editProjectHandler = () => {
        // открыть модальное окно с воспроизведением инструкции
        setIsPlayModalOpen(true);
       // router.push(`/instructions/${instruction.id}`)
    }

    const openHandler = () => {
        setIsModalOpen(true);
    }

    const openDeleteHandler = () => {
        setIsDeleteModalOpen(true);
    }


    const openAddHandler = () => {
        setIsAddModalOpen(true);
    }

   // console.log("Project in menu: ", project)

    return (
        <>
       
        <div className={styles.edit}>
            <nav>
                <ul>
                <li>
                    <span
                    onClick={openAddHandler}
                        >Назначить ученика</span>
                    </li>
                <li>
                    <span
                    onClick={editProjectHandler}
                        >Воспроизвести</span>
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

<RenameInstructionModal isOpen={isModalOpen} instruction={instruction} onClose={() => {
    closeDropdown();
    setIsModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />

  <DeleteInstructionModal
  isOpen={isDeleteModalOpen} instruction={instruction} onClose={() => {
    closeDropdown();
    setIsDeleteModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
}} />

<AddStudentToInstructionModal 
  isOpen={isAddModalOpen} instruction={instruction} onClose={() => {
    closeDropdown();
    setIsAddModalOpen(false);
    console.log("refresh");
}} />

<PlayInstructionModal 
 isOpen={isPlayModalOpen} instruction={instruction} onClose={() => {
    closeDropdown();
    setIsPlayModalOpen(false);
    console.log("refresh");
}} />

 </>
    )
}