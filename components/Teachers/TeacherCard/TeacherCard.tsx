import { useState } from "react";
import Image from 'next/image';
import styles from './TeacherCard.module.css';
import DotsIcon from '../dots_icon.png';
import { EditTeacherMenu } from "@/components/EditTeacherMenu/EditTeacherMenu";
import { TeacherModel } from "../../../interfaces/student.interface";

interface TeacherProps {
    teacher: TeacherModel;
}

export const TeacherCard = ({ teacher }: TeacherProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const closeDropdown = () => {
      setIsEditOpen(false);
  };

  return (
    <>
        <div className={styles.row} key={teacher.id}>
          <div>{teacher.first_name} {teacher.last_name}</div>
          <div>{teacher.phone_number}</div>
          <div>{teacher.email}</div>
          <div>
            <Image
              onClick={() => setIsEditOpen(!isEditOpen)}
              className={styles.menu}
              src={DotsIcon}
              alt="Add teacher" />

            {
              isEditOpen && (
                <EditTeacherMenu key={teacher.id} closeDropdown={closeDropdown} teacher={teacher} />
              )
            }
          </div>
        </div>

    </>
  )
}