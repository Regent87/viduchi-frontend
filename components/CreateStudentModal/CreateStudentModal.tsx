'use client';

import { CreateStudentModalProps } from "./CreateStudentModal.props"
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './CreateStudentModal.module.css';

export const CreateStudentModal = ({ isOpen, onClose }: CreateStudentModalProps): JSX.Element => { 


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [phone, setPhone] = useState('+7');

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    return (
        <Modal
        className={styles.white}
        isOpen={isOpen} onClose={onClose} title="+ Новый ученик">
<form>
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

</div>

<div className={styles.buttons}>
<button className={styles.reset}>Сброс</button>
<button
disabled={isLoading || !name.trim() || !surname.trim() || !fatherName.trim()}
className={styles.apply}>Добавить</button>
</div>



</form>
            </Modal>
    )
}