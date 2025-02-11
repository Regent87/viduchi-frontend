"use client";

import styles from './Teachers.module.css';
import { useState, useEffect } from 'react';
import { TeacherActionModal } from '../TeacherActionModal/TeacherActionModal';
import { getAllMentors } from '@/api/client/mentors';
import { TeacherCard } from './TeacherCard/TeacherCard';
import { TeacherModel } from '@/interfaces/student.interface';
import { Button } from '../Button/Button';

export const Teachers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [teachers, setTeachers] = useState<TeacherModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeachers = async () => {
        setIsLoading(true);

        const teachers = await getAllMentors();
        setTeachers(teachers);

        setIsLoading(false);
    };
    fetchTeachers();
  }, [])

  return (
    <>
    <div className={styles.teachers}>
      <div className={styles.list}>
        <div className={styles.header}>
          <div>ФИО</div>
          <div>Номер телефона</div>
          <div>E-mail</div>
          <div></div>
        </div>

        {teachers.map((teacher: TeacherModel) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
      <div className={styles.buttonArea}>
        <Button
          appearance="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Добавить наставника
        </Button>
      </div>
    </div>

    <TeacherActionModal
      mode="create"
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
    />
    </>
  )
}