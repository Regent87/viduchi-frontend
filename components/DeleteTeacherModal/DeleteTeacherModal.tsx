"use client";

import { DeleteTeacherModalProps } from './DeleteTeacherModal.props';
import styles from './DeleteTeacherModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import { deleteMentor } from '@/api/client/mentors';
import { Button } from '../Button/Button';

export const DeleteTeacherModal = ({ isOpen, onClose, id }: DeleteTeacherModalProps)=> {
    const handleDelete = async () => {
        await deleteMentor(Number(id));
        onClose();
    }

    return (
        <Modal
            className={styles.white}
            isOpen={isOpen}
            onClose={onClose}
            title="+ Точно удалить наставника?">
            <form>
                <div className={styles.buttons}>
                    <Button
                        appearance="ghost"
                        className={styles.reset}
                        onClick={() => onClose()}>
                            Нет
                    </Button>
                    <Button
                        appearance="primary"
                        className={styles.apply}
                        onClick={() => handleDelete()}>
                            Да
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
