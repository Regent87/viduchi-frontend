"use client";

import styles from './Teachers.module.css';
import avatar from '../../public/user_avatar.png';
import Image from 'next/image';
import DotsIcon from './dots_icon.png';
import { useState, useEffect } from 'react';
import { EditTeacherMenu } from '../EditTeacherMenu/EditTeacherMenu';
import { CreateTeacherModal } from '../CreateTeacherModal/CreateTeacherModal';
import { getAllMentors } from '@/api/client/mentors';
import { TeacherCard } from './TeacherCard/TeacherCard';

export const Teachers = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isEdit2Open, setIsEdit2Open] = useState(false);

    const closeDropdown = () => {
      setIsEditOpen(false);
  };

  const closeDropdown2 = () => {
    setIsEdit2Open(false);
};


 // get studens from erver 
  const [teachers, setTeachers] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<any>([]);

  // event handler for page change on click
  const handlePageChange = (pageNumber:number) => {
    if (
      pageNumber > 0 &&
      pageNumber <= teachers.length / 3 &&
      pageNumber !== page
    )
      setPage(pageNumber);    
  };

  useEffect(() => {

        const fetchTeachers = async () => {
                    setIsLoading(true);
        
                    const teachers = await getAllMentors();
                    setTeachers(teachers);
        
                    setIsLoading(false);
                };
                fetchTeachers();
               

    }, [])


    console.log("teachers: ", teachers)


    return (
        <>
         <div className={styles.list}>
        <table className={styles.students}>
          <thead>
          <tr>
    <th></th>
    <th>Наставник</th>
    <th>Должность</th>
    <th>Номер телефона</th>
    <th>E-mail</th>
    <th>Назначенные проекты</th>
    <th></th>
  </tr>
          </thead>
 <tbody>
 {
  teachers.length > 0 && teachers.slice(page * 3 - 3, page * 3).map((teacher: any) => (
<TeacherCard key={teacher.id} teacher={teacher} />
  )) 
}
 </tbody>
</table>
</div>


{teachers.length > 0 && (
        <section className="pagination">
          <span
            onClick={() => handlePageChange(page - 1)}
            className={`arrow ${page === 1 ? "pagination__disabled" : ""}`}
          >
            ⬅
          </span>
          {[...Array(Math.floor(teachers.length / 3))].map((_, i) => (
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
              page === Math.floor(teachers.length / 3)
                ? "pagination__disabled"
                : ""
            }`}
          >
            ➡
          </span>
        </section>
      )}


<button
onClick={() => setIsModalOpen(true)}
className={styles.addStudentButton}>
    Добавить наставника
</button>

<CreateTeacherModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        console.log("refresh");
      //  router.replace('/projects');
      }} />
</>
    )
}