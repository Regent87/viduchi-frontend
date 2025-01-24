"use client";

import { Modal } from "../site/ModalForm/ModalForm";
import { EditStudentModalProps } from "./EditStudentModal.props";
import { useState } from 'react';
import styles from './EditStudentModal.module.css';
import { useRouter } from 'next/navigation';

export const EditStudentModal = ({isOpen, onClose, student}: EditStudentModalProps) => {

    console.log(" ОКНО СТУДЕНТА ", student)

    const [name, setName] = useState(student.student.first_name);
    const [surname, setSurname] = useState(student.student.surname);
    const [fatherName, setFatherName] = useState(student.student.last_name);
    const [phone, setPhone] = useState('+737529788888');
    const [position, setPosition] = useState('Электрик');
    const [email, setEmail] = useState(student.student.email);

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
disabled={false}
className={styles.apply}>Сохранить</button>
</div>



</form>
        </Modal>
    )
}