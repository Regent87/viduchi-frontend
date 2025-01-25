"use client";

import { Modal } from "../site/ModalForm/ModalForm";
import { EditTeacherModalProps } from "./EditTeacherModal.props";
import { useState } from 'react';
import styles from './EditTeacherModal.module.css';
import { useRouter } from 'next/navigation';

export const EditTeacherModal = ({isOpen, onClose, teacher}: EditTeacherModalProps) => {

    const [name, setName] = useState(teacher.teacher.first_name);
    const [surname, setSurname] = useState(teacher.teacher.surname);
    const [fatherName, setFatherName] = useState(teacher.teacher.last_name);
    const [phone, setPhone] = useState(teacher.teacher.phone_number);
    const [position, setPosition] = useState('Менеджеры');
    const [email, setEmail] = useState(teacher.teacher.email);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const reset = () => {
         setName('');
         setEmail('');
         setSurname('');
         setFatherName('');
         setPhone('+7');
         setPosition('');
     };

     const handleSubmit = async () => {

     }

    return (
        <Modal  className={styles.white}
        isOpen={isOpen} onClose={onClose} title="+ Изменить данные">
<form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
<div className={styles.addStudent}>
<div>
<label htmlFor="surname">Фамилия
    <div> <input
    onChange={(e: any) => setSurname(e.target.value)}
    value={surname}
    type="text" required /></div>
</label>
<label htmlFor="fatehrname">Отчество
    <div> <input 
    onChange={(e: any) => setFatherName(e.target.value)}
    value={fatherName}
    type="text" required /></div>
</label>
</div>

<div>
<label htmlFor="name">Имя
    <div> <input
    onChange={(e: any) => setName(e.target.value)}
    value={name}
     type="text" required /></div>
</label>
<label htmlFor="phone">Номер телефона
    <div> <input
    onChange={(e: any) => setPhone(e.target.value)}
    value={phone}
     type="text" required /></div>
</label>
</div>


<div>
<label htmlFor="name">Должность
    <div> <input onChange={(e: any) => setPosition(e.target.value)}
    value={position}
     type="text" required /></div>
</label>
</div>
<div>
<label htmlFor="phone">E-mail
    <div> <input
    onChange={(e: any) => setEmail(e.target.value)}
    value={email}
     type="email" required /></div>
</label>
</div>


</div>

<div className={styles.buttons}>
<button
onClick={reset}
className={styles.reset}>Сброс</button>
<button
disabled={isLoading || !name.trim() || !surname.trim() || !fatherName.trim() || !position.trim() || !email.trim()}
className={styles.apply}>Сохранить</button>
</div>



</form>
        </Modal>
    )
}