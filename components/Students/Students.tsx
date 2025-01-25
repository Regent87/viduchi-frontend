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
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<any>([]);

  // event handler for page change on click
  const handlePageChange = (pageNumber:number) => {
    if (
      pageNumber > 0 &&
      pageNumber <= students.length / 3 &&
      pageNumber !== page
    )
      setPage(pageNumber);    
  };

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
  students.length > 0 && students.slice(page * 3 - 3, page * 3).map((student: any) => (
<StudentCard key={student.id} student={student} />
  )) 
}




  </tbody>
</table>
</div>


{students.length > 0 && (
        <section className="pagination">
          <span
            onClick={() => handlePageChange(page - 1)}
            className={`arrow ${page === 1 ? "pagination__disabled" : ""}`}
          >
            {/* ⬅ */}
          </span>
          {[...Array(Math.floor(students.length / 3))].map((_, i) => (
            <span
              className={`page__number ${
                page === i + 1 ? "selected__page__number" : ""
              }`}
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => handlePageChange(page + 1)}
            className={`arrow ${
              page === Math.floor(students.length / 3)
                ? "pagination__disabled"
                : ""
            }`}
          >
            {/* ➡ */}
          </span>
        </section>
      )}



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