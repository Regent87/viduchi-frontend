"use client";

import { Modal } from "../site/ModalForm/ModalForm";
import { EditStudentModalProps } from "./EditStudentModal.props";
import { useState, useEffect } from 'react';
import styles from './EditStudentModal.module.css';
import { useRouter } from 'next/navigation';
import { updateStudent } from "@/api/client/students";
import { getAllPositions } from "@/api/client/positions";
import useStore from "@/store/store";

export const EditStudentModal = ({isOpen, onClose, student}: EditStudentModalProps) => {

   // console.log(" ОКНО СТУДЕНТА ", student)

   // zustand store
   const updateStudentInStore = useStore((state) => state.updateStudent);


    const [studentId, setStudentId] = useState(student.student.id);
    const [name, setName] = useState(student.student.first_name);
    const [surname, setSurname] = useState(student.student.surname);
    const [fatherName, setFatherName] = useState(student.student.last_name);
    const [phone, setPhone] = useState(student.student.phone_number);
    const [position, setPosition] = useState('Электрик');
    const [positionId, setPositionId] = useState(0);
    const [email, setEmail] = useState(student.student.email);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    console.log(" ID СТУДЕНТА ", studentId)

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
        setIsLoading(true)
          const student = await updateStudent(studentId, email, name, fatherName, surname, positionId, phone);
                console.log('гupdated student')
                console.log(student)
                reset()
                onClose();
                if (student) {
                    console.log("UPDATED STUDENT: ", student)
                   // updateStudentInStore(studentId, student);
                    console.log("studetns refresh")
                    router.push("/admin/students");
                }
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
disabled={false}
className={styles.apply}>Сохранить</button>
</div>



</form>
        </Modal>
    )
}