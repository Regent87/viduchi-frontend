"use client";

import styles from './Students.module.css';
import avatar from '../../public/user_avatar.png';
import Image from 'next/image';
import DotsIcon from './dots_icon.png';
import { useState, useEffect } from 'react';
import { CreateStudentModal } from '../CreateStudentModal/CreateStudentModal';
import { EditMenu } from '../EditMenu/EditMenu';
import { getAllStudents } from '@/api/client/students';
import { StudentCard } from './StudentCard/StudentCard';

export const Students = () => {

  // get studens from erver 
  const [students, setStudents] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>([]);

  useEffect(() => {

        const fetchSrudents = async () => {
                    setIsLoading(true);
        
                    const students = await getAllStudents();
                    setStudents(students);
        
                    setIsLoading(false);
                };
                fetchSrudents();
               

    }, [])


    console.log("Students: ", students)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEdit2Open, setIsEdit2Open] = useState(false);

    const closeDropdown = () => {
      setIsEditOpen(false);
  };

  const closeDropdown2 = () => {
    setIsEdit2Open(false);
};

    return (
        <>
        <div className={styles.list}>
        <table className={styles.students}>
          <thead  >

  <tr>
    <th></th>
    <th>Ученик</th>
    <th>Должность</th>
    <th>Номер телефона</th>
    <th>E-mail</th>
    <th>Назначенные проекты</th>
    <th></th>
  </tr>
  </thead>
  <tbody className={styles.list}>

  {
  students.length > 0 && students.map((student: any) => (
<StudentCard key={student.id} student={student} />
  )) 
}




  </tbody>
</table>
</div>

<button
onClick={() => setIsModalOpen(true)}
className={styles.addStudentButton}>
    Добавить ученика
</button>

<CreateStudentModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        console.log("refresh");
      //  router.replace('/projects');
      }} />
</>
    )
}