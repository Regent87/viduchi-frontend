'use client';

import { CreateStudentModalProps } from "./CreateStudentModal.props"
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './CreateStudentModal.module.css';
import { createStudent } from "@/api/client/students";
import { getAllPositions } from "@/api/client/positions";

export const CreateStudentModal = ({ isOpen, onClose }: CreateStudentModalProps) => { 


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [phone, setPhone] = useState('+7');
    const [positionId, setPositionId] = useState(0);
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // get all positions
    const [positions, setPositions] = useState([]);

    useEffect(() => {

        const fetchPositions = async () => {
                    setIsLoading(true);
        
                    const positions = await getAllPositions();
                    setPositions(positions);
        
                    setIsLoading(false);
                };
                fetchPositions();
               

    }, [])
   

    const reset = () => {
        setName('');
        setEmail('');
        setSurname('');
        setFatherName('');
        setPhone('+7');
        setPositionId(0);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        console.log('Имя - ', name)
        console.log('Afvbkbz - ', surname)
        console.log('Отчество - ', fatherName)
        console.log('Position id - ', positionId)
      
        console.log('Телефон - ', phone)
        console.log('Почта - ', email)
        const student = await createStudent(email, name, fatherName, surname, positionId, phone);
        console.log('new student')
        console.log(student)
        reset()
        onClose();
        if (student) {
            console.log("studetns refresh")
            router.push("/admin/profile");
        }
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
<label htmlFor="position">Должность
    <div> 
    <select  onChange={(e: any) => setPositionId(Number(e.target.value))}>
          
      
        {
            positions && positions.map((pos: any) => (
                <option key={pos.id} value={pos.id}>{pos.title}</option>
            ))
        }
          </select>

        {/* <input onChange={(e: any) => setPosition(e.target.value)}
    value={position}
     type="text" required /> */}
     
     </div>
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
type="submit"
// onClick={(e: any) => {
// e.preventDefault();
// handleSubmit();
// }}
disabled={!name.trim() || !surname.trim() || !fatherName.trim() || !email.trim()}
className={styles.apply}>Добавить</button>
</div>



</form>
            </Modal>
    )
}