'use client';

import { TeacherActionModalProps } from './TeacherActionModal.props';
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { useState } from 'react';
import styles from './TeacherActionModal.module.css';
import { createMentor, updateMentor } from '@/api/client/mentors';
import { P } from '../P/P';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export const TeacherActionModal = ({ isOpen, onClose, mode, teacher }: TeacherActionModalProps) => {
    const [teacherId, setTeacherId] = useState(teacher?.id || 0);
    const [name, setName] = useState(teacher?.first_name || '');
    const [surname, setSurname] = useState(teacher?.last_name || '');
    const [fatherName, setFatherName] = useState(teacher?.surname || '');
    const [phone, setPhone] = useState(teacher?.phone_number || '+7');
    const [email, setEmail] = useState(teacher?.email || '');

    const [isLoading, setIsLoading] = useState(false);

    const reset = () => {
        setTeacherId(teacher?.id || 0);
        setName(teacher?.first_name || '');
        setEmail(teacher?.email || '');
        setSurname(teacher?.last_name || '');
        setFatherName(teacher?.surname || '');
        setPhone(teacher?.phone_number || '+7');
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        if (mode === 'create') {
            await createMentor(email, name, fatherName, surname, phone);
        } else {
            await updateMentor(teacherId, email, name, fatherName, surname, phone);
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