'use client';

import { CreateTeacherModalProps } from './CreateTeacherModal.props';
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './CreateTeacherModal.module.css';
import { getAllPositions } from '@/api/client/positions';
import { createMentor } from '@/api/client/mentors';
// import { createStudent } from "@/api/client/students";

export const CreateTeacherModal = ({ isOpen, onClose }: CreateTeacherModalProps) => { 


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [phone, setPhone] = useState('+7');
    const [position, setPosition] = useState('');
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
        setPosition('');
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        console.log('Имя - ', name)
        console.log('Afvbkbz - ', surname)
        console.log('Отчество - ', fatherName)
        console.log('Должность - ', position)
        console.log('Телефон - ', phone)
        console.log('Почта - ', email)
     //   const student = await createStudent(email, name, fatherName, surname);
     const teacher = await createMentor(email, name, fatherName, surname, phone)
        console.log('new teacher')
     //   console.log(student)
        reset()
        onClose();
        // if (student) {
        //     console.log("studetns refresh")
        //     router.replace("/admin/students");
        // }
setIsLoading(false)
    }

    return (
        <Modal
        className={styles.white}
        isOpen={isOpen} onClose={onClose} title="+ Новый наставник">
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
    <div> 
        <select name="" id="">
            <option value="0">Менеджеры</option>
            <option value="1">Сварщики</option>
        </select>
    {/* <select 
    onChange={(e: any) => setPosition(e.target.value)}>
          
      
          {
              positions && positions.map((pos: any) => (
                  <option value={pos.id}>{pos.title}</option>
              ))
          }
            </select> */}
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
disabled={false}
className={styles.apply}>Добавить</button>
</div>



</form>
            </Modal>
    )
}