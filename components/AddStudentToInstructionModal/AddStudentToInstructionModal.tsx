'use client';

import { useState, useEffect } from 'react';
import styles from './AddStudentToInstructionModal.module.css';
import { Modal } from '@/components/site/ModalForm/ModalForm';

import { AddStudentToInstructionProps } from './AddStudentToInstructionModal.props';

// import { createProject } from '@/api/client/projects';
import { useRouter } from 'next/navigation';
import { getAllPositions } from '@/api/client/positions';
import { addPositionOfInstruction } from '@/api/client/instructions';

export const AddStudentToInstructionModal = ({ isOpen, instruction, onClose }: AddStudentToInstructionProps) => {
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


    // get all positions
      const [positions, setPositions] = useState([]);
      const [positionId, setPositionId] = useState(0);
  
      useEffect(() => {
  
          const fetchPositions = async () => {
                      setIsLoading(true);
          
                      const positions = await getAllPositions();
                      setPositions(positions);
          
                      setIsLoading(false);
                  };
                  fetchPositions();
                 
  
      }, [])


  const handleSubmit = async () => {
      setIsLoading(true);

    //   const project = await createProject(projectName);
    //   console.log("project");
    //   console.log(project);

      setProjectName('');

    // добавить должностть ученика к инструкции
    const response = await addPositionOfInstruction(instruction.id, positionId);
  console.log(response);
      onClose();

    

      setIsLoading(false);

  };

  return (

    <Modal
    className={styles.white}
    isOpen={isOpen} onClose={onClose} title="+ Изменить инструкцию">
<form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}>
<div className={styles.addProject}>

{/* <input
onChange={(e: any) => setProjectName(e.target.value)}
value={instruction.title}
placeholder='Введите название инструкции'
type="text" required /> */}

<select  onChange={(e: any) => setPositionId(Number(e.target.value))}>
          
      
          {
              positions && positions.map((pos: any) => (
                  <option key={pos.id} value={pos.id}>{pos.title}</option>
              ))
          }
            </select>



</div>

<div className={styles.buttons}>
<button
onClick={onClose}
className={styles.reset}>Отмена</button>
<button
disabled={isLoading || !projectName.trim()}
className={styles.apply}>Сохранить</button>
</div>



</form>
        </Modal>


  );
};