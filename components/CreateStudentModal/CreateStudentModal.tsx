'use client';

import { CreateStudentModalProps } from "./CreateStudentModal.props"
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './CreateStudentModal.module.css';
import { createStudent } from "@/api/client/students";

export const CreateStudentModal = ({ isOpen, onClose }: CreateStudentModalProps): JSX.Element => { 


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [phone, setPhone] = useState('+7');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const reset = () => {
       // setIsLoading(true);
        setName('');
        setEmail('');
        setSurname('');
        setFatherName('');
        setPhone('+7');
        setPosition('');
     //   setIsLoading(false);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        console.log('Имя - ', name)
        console.log('Afvbkbz - ', surname)
        console.log('Отчество - ', fatherName)
        console.log('Должность - ', position)
        console.log('Телефон - ', phone)
        console.log('Почта - ', email)
        const student = await createStudent(email, name, fatherName, surname);
        console.log('new student')
        console.log(student)
setIsLoading(false)
    }

    return (
        <Modal
        className={styles.white}
        isOpen={isOpen} onClose={onClose} title="+ Новый ученик">
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
className={styles.apply}>Добавить</button>
</div>



</form>
            </Modal>
    )
}