"use client";

import styles from './Students.module.css';
import { useState, useEffect } from 'react';
import { StudentActionModal } from '../StudentActionModal/StudentActionModal';
import { getAllStudents } from '@/api/client/students';
import { StudentCard } from './StudentCard/StudentCard';
import { StudentModel } from '@/interfaces/student.interface';
import { Button } from '../Button/Button';

export const Students = () => {
  const [students, setStudents] = useState<StudentModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);

      const students = await getAllStudents();
      setStudents(students);

      setIsLoading(false);
    };

    fetchStudents();
  }, [])

  return (
    <>
      <div className={styles.students}>
        <div className={styles.list}>
          <div className={styles.header}>
            <div>ФИО</div>
            <div>Дожность</div>
            <div>Номер телефона</div>
            <div>E-mail</div>
            <div></div>
          </div>

          {students.map((student: StudentModel) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
        <div className={styles.buttonArea}>
          <Button
            appearance="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Добавить студента
          </Button>
        </div>
      </div>

      <StudentActionModal
        mode="create"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  )
}