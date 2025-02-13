import { useState } from "react";
import Image from 'next/image';
import styles from './StudentCard.module.css';
import { EditMenu } from '../../EditMenu/EditMenu';
import DotsIcon from '../dots_icon.png';
import { StudentModel } from '../../../interfaces/student.interface';

interface StudentProps {
    student: StudentModel;
}

export const StudentCard = ({ student }: StudentProps) => {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const closeDropdown = () => {
        setIsEditOpen(false);
    };

    return (
      <>
          <div className={styles.row} key={student.id}>
            <div>{student.first_name} {student.last_name}</div>
            <div>{student.position?.title || 'Нет должности'}</div>
            <div>{student.phone_number}</div>
            <div>{student.email}</div>
            <div>
              <Image
                onClick={() => setIsEditOpen(!isEditOpen)}
                className={styles.menu}
                src={DotsIcon}
                alt="Add student" />

              {
                isEditOpen && (
                  <EditMenu key={student.id} closeDropdown={closeDropdown} student={student} />
                )
              }
            </div>
          </div>
      </>
    )
}