'use client';

import { StudentActionModalProps } from "./StudentActionModal.props"
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { useEffect, useState } from 'react';
import styles from './StudentActionModal.module.css';
import { createStudent, updateStudent } from "@/api/client/students";
import { getAllPositions } from "@/api/client/positions";
import { Input } from "../Input/Input";
import { P } from "../P/P";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";

export const StudentActionModal = ({ mode, student, isOpen, onClose }: StudentActionModalProps) => {
    const [studentId, setStudentId] = useState(student?.id || 0);
    const [name, setName] = useState(student?.first_name || '');
    const [surname, setSurname] = useState(student?.last_name || '');
    const [fatherName, setFatherName] = useState(student?.surname || '');
    const [phone, setPhone] = useState(student?.phone_number || '+7');
    const [positionId, setPositionId] = useState(student?.position?.id || 0);
    const [email, setEmail] = useState(student?.email || '');

    const [isLoading, setIsLoading] = useState(false);

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const fetchPositions = async () => {
            setIsLoading(true);
            const positions = await getAllPositions();
            setPositions(positions);
            if (!student?.position?.id && positions.length > 0) {
                setPositionId(positions[0].id);
            }
            setIsLoading(false);
        };
        fetchPositions();
    }, [student?.position?.id]);

    useEffect(() => {
        if (student?.position?.id) {
            setPositionId(student.position.id);
        }
    }, [student]);

    const reset = () => {
        setStudentId(student?.id || 0);
        setName(student?.first_name || '');
        setEmail(student?.email || '');
        setSurname(student?.last_name || '');
        setFatherName(student?.surname || '');
        setPhone(student?.phone_number || '+7');
        setPositionId(student?.position.id || 0);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        if (mode === 'create') {
            await createStudent(email, name, surname, fatherName, positionId, phone);
        } else {
            await updateStudent(studentId, email, name, surname, fatherName, positionId, phone);
        }
        reset();
        onClose();
        setIsLoading(false);
    }

    return (
        <Modal
            className={styles.white}
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? "+ Создание" : "+ Редактирование"}>
            <form className={styles.form}>
                <div>
                    <P size="s">Фамилия</P>
                    <Input
                        type="text"
                        placeholder="Иванов"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <P size="s">Имя</P>
                    <Input
                        type="text"
                        placeholder="Иван"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <P size="s">Отчество</P>
                    <Input
                        type="text"
                        placeholder="Иванович"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                    />
                </div>
                <div>
                    <P size="s">Телефон</P>
                    <Input
                        type="text"
                        placeholder="+79001234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <P size="s">Должность</P>
                    <Select
                        className={styles.element}
                        options={positions}
                        value={positionId}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setPositionId(value);
                        }}
                    />
                </div>
                <div>
                    <P size="s">Email</P>
                    <Input
                        type="email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Button
                        className={styles.element}
                        appearance="ghost"
                        onClick={reset}
                    >
                        {mode === 'create' ? "Сброс" : "Отменить"}
                    </Button>
                </div>
                <div>
                    <Button
                        className={styles.element}
                        appearance="primary"
                        onClick={handleSubmit}
                    >
                        {mode === 'create' ? "Создать" : "Сохранить"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}